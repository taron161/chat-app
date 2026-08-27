import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const after = searchParams.get('after');
    
    let messages: any[] = [];
    
    if (after) {
      // Загружаем только новые сообщения
      const lastMessage = await prisma.message.findUnique({
        where: { id: after },
      });
      
      if (lastMessage) {
        messages = await prisma.message.findMany({
          where: {
            createdAt: {
              gt: lastMessage.createdAt,
            },
          },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
        });
      }
    } else {
      // Загружаем все сообщения
      messages = await prisma.message.findMany({
        include: {
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
    }

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Error loading messages:', error);
    return NextResponse.json(
      { error: 'Failed to load messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, userId } = body;

    if (!content || !userId) {
      return NextResponse.json(
        { error: 'Content and userId are required' },
        { status: 400 }
      );
    }

    const message = await prisma.message.create({
      data: {
        content,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}