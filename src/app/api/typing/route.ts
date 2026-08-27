import { NextRequest, NextResponse } from 'next/server';

// Глобальное хранилище для статусов печати
declare global {
  var typingUsers: Map<string, {
    userId: string;
    username: string;
    name: string | null;
    timestamp: number;
  }> | undefined;
}

// Инициализируем Map если его ещё нет
if (!global.typingUsers) {
  global.typingUsers = new Map();
}

export async function GET() {
  const now = Date.now();
  const activeTyping: Array<{ userId: string; username: string; name: string | null }> = [];
  
  // Проверяем, что typingUsers существует
  if (!global.typingUsers) {
    global.typingUsers = new Map();
  }
  
  // Очищаем устаревшие статусы и собираем активные
  for (const [key, value] of global.typingUsers.entries()) {
    if (now - value.timestamp > 3000) {
      global.typingUsers.delete(key);
    } else {
      activeTyping.push({
        userId: value.userId,
        username: value.username,
        name: value.name,
      });
    }
  }
  
  return NextResponse.json({ typingUsers: activeTyping });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, username, name, isTyping } = body;
    
    console.log('Typing status update:', { userId, username, isTyping });
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    // Проверяем, что typingUsers существует
    if (!global.typingUsers) {
      global.typingUsers = new Map();
    }
    
    if (isTyping) {
      global.typingUsers.set(userId, {
        userId,
        username,
        name,
        timestamp: Date.now(),
      });
      console.log('User started typing:', username);
      console.log('Active typing users:', global.typingUsers.size);
    } else {
      global.typingUsers.delete(userId);
      console.log('User stopped typing:', username);
      console.log('Active typing users:', global.typingUsers.size);
    }
    
    return NextResponse.json({ 
      success: true, 
      typingCount: global.typingUsers.size 
    });
  } catch (error) {
    console.error('Error updating typing status:', error);
    return NextResponse.json({ 
      error: 'Failed to update typing status' 
    }, { status: 500 });
  }
}