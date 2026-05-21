import { prisma } from '@/lib/prisma'
import { hashPassword, createToken } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password, name } = await request.json()
  
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'User exists' }, { status: 400 })
  }
  
  const hashedPassword = await hashPassword(password)
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name, role: 'MEMBER' }
  })
  
  const token = createToken(user.id, user.email, user.role)
  return NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
}