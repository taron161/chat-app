import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  console.log('Начало входа...');
  
  try {
    const body = await request.json();
    console.log('Получены данные:', body);
    
    const { username, password } = body;

    if (!username || !password) {
      console.log('Отсутствуют username или password');
      return NextResponse.json(
        { error: 'Необходимо указать логин и пароль' },
        { status: 400 }
      );
    }

    console.log('Ищем пользователя...');
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      console.log('Пользователь не найден');
      return NextResponse.json(
        { error: 'Пользователь не найден' },
        { status: 401 }
      );
    }

    console.log('Проверяем пароль...');
    if (password !== user.password) {
      console.log('Неверный пароль');
      return NextResponse.json(
        { error: 'Неверный пароль' },
        { status: 401 }
      );
    }

    console.log('Вход успешен');

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
    console.error('Ошибка при входе:', error);
    return NextResponse.json(
      { error: `Ошибка при входе: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` },
      { status: 500 }
    );
  }
}