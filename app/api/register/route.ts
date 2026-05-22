import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  console.log('=== REGISTER API CALLED ===')
  
  try {
    const body = await request.json()
    console.log('Request body:', { ...body, password: '***' })
    
    const { name, email, password } = body
    
    // Validate inputs
    if (!name || !email || !password) {
      console.log('Missing fields:', { name: !!name, email: !!email, password: !!password })
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }
    
    console.log('Checking existing user...')
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    console.log('Existing user:', existingUser ? 'Yes' : 'No')
    
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }
    
    console.log('Hashing password...')
    const hashedPassword = await bcrypt.hash(password, 10)
    
    console.log('Creating user...')
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'MEMBER'
      }
    })
    
    console.log('User created:', user.id)
    
    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
    
  } catch (error) {
    console.error('=== REGISTER ERROR ===')
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error)
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    console.error('Full error:', error)
    
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }, { status: 500 })
  }
}