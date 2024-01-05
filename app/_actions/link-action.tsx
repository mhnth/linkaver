'use server';

import prisma from '@/lib/prismadb';
import { getCurrentUser } from '@/lib/session';

export const addLink = async (rows: { link: string; collection: string }[]) => {
  const currentUser = await getCurrentUser();

  for (const row of rows) {
    // Find or create the user based on email
    const user = await prisma.user.findUnique({
      where: {
        email: currentUser?.email || '',
      },
    });

    if (!user) return;

    // Find or create the collection based on name
    const collection = await prisma.collection.upsert({
      where: { name: row.collection },
      update: {},
      create: { name: row.collection, ownerId: user.id },
    });

    // Create the link
    const link = await prisma.link.create({
      data: {
        link: row.link,
        ownerId: user.id,
        collectionId: collection.id,
      },
    });
  }

  return 'ok';
};

export const deleteLink = async (id: string) => {
  await prisma?.link.delete({
    where: {
      id: id,
    },
  });
};
