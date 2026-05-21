import { prisma } from '@/lib/prisma'
import { verifyPassword, createToken } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  
  const isValid = await verifyPassword(password, user.password)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
  
  const token = createToken(user.id, user.email, user.role)
  return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
}