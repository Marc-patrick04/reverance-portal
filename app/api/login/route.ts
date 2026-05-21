import { prisma } from '@/lib/prisma'
import { verifyPassword, createToken } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: { id: true, email: true, name: true, role: true, password: true }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    
    const token = createToken(user.id, user.email, user.role)
    return NextResponse.json({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}