import jwt from 'jsonwebtoken'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

const SECRET = process.env.JWT_SECRET || 'my-secret-key'

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashed: string) {
  return bcrypt.compare(password, hashed)
}

export function createToken(userId: string, email: string, role: string) {
  return jwt.sign({ userId, email, role }, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { userId: string; email: string; role: string }
  } catch {
    return null
  }
}

export async function getUserFromToken(token: string) {
  const decoded = verifyToken(token)
  if (!decoded) return null
  return prisma.user.findUnique({ where: { id: decoded.userId } })
}