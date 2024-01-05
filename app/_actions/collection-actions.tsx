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

export const deleteCollection = async (id: string) => {
  await prisma?.collection.delete({
    where: {
      id: id,
    },
  });
};
