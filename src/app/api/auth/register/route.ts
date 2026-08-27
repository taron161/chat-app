import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  console.log('Начало регистрации...');
  
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

    console.log('Проверяем существующего пользователя...');
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      console.log('Пользователь уже существует');
      return NextResponse.json(
        { error: 'Пользователь уже существует' },
        { status: 400 }
      );
    }

    console.log('Создаем пользователя...');
    const user = await prisma.user.create({
      data: {
        username,
        email: `${username}@nightcity.com`,
        password: password,
      },
    });

    console.log('Пользователь создан:', user.id);

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
    console.error('Ошибка при регистрации:', error);
    return NextResponse.json(
      { error: `Ошибка при регистрации: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` },
      { status: 500 }
    );
  }
}