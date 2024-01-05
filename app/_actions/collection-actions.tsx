'use server';

import prisma from '@/lib/prismadb';

export const addCollection = async (email: string, name: string) => {
  await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      collection: {
        create: {
          name: name,
        },
      },
    },
  });
};
