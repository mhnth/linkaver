import prisma from '@/lib/prismadb';
import { NextResponse, NextRequest } from 'next/server';
import { getCurrentUser } from '@/lib/session';

export async function GET(req: NextRequest) {
  const collectionId = req.nextUrl.pathname.split('/').pop();

  const links = await prisma?.collection.findFirst({
    where: {
      id: collectionId,
    },
    select: {
      link: true,
    },
  });

  return NextResponse.json(links);
}
