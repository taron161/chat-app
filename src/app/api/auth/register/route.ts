import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  console.log('Registration attempt...');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('DATABASE_URL set:', !!process.env.DATABASE_URL);
  console.log('DATABASE_URL prefix:', process.env.DATABASE_URL?.substring(0, 20) + '...');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);
    
    const { username, password } = body;

    if (!username || !password) {
      console.log('Missing fields');
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    console.log('Checking existing user...');
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    console.log('Existing user:', existingUser);

    if (existingUser) {
      console.log('User exists');
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    console.log('Creating user...');
    const user = await prisma.user.create({
      data: {
        username,
        email: `${username}@nightcity.com`,
        password,
      },
    });
    console.log('User created:', user.id);

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Registration error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    
    return NextResponse.json(
      { 
        error: 'Registration failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        prismaError: JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}