import prisma from '@/lib/prismadb';
import { NextResponse, NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user?.email) return NextResponse.json({ error: 'No authentication' });

  const collections = await prisma.user.findUnique({
    where: {
      email: user?.email,
    },
    select: {
      collection: true,
    },
  });

  return NextResponse.json(collections);
}
