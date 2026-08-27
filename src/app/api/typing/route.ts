import { NextRequest, NextResponse } from 'next/server';

// Хранилище статусов печати (в production лучше использовать Redis)
const typingUsers = new Map<string, { userId: string; username: string; name: string | null; timestamp: number }>();

export async function GET() {
  const now = Date.now();
  const activeTyping = [];
  
  for (const [key, value] of typingUsers.entries()) {
    // Удаляем статусы старше 3 секунд
    if (now - value.timestamp > 3000) {
      typingUsers.delete(key);
    } else {
      activeTyping.push(value);
    }
  }
  
  return NextResponse.json({ typingUsers: activeTyping });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, username, name, isTyping } = body;
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    if (isTyping) {
      typingUsers.set(userId, {
        userId,
        username,
        name,
        timestamp: Date.now(),
      });
    } else {
      typingUsers.delete(userId);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating typing status:', error);
    return NextResponse.json({ error: 'Failed to update typing status' }, { status: 500 });
  }
}