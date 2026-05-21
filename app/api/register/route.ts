import { prisma } from '@/lib/prisma'
import { hashPassword, createToken } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()
    
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'User exists' }, { status: 400 })
    }
    
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role: 'MEMBER' },
      select: { id: true, email: true, name: true, role: true }
    })
    
    const token = createToken(user.id, user.email, user.role)
    return NextResponse.json({ token, user })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}