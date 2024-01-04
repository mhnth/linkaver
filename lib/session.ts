import { Options } from '@/app/api/auth/[...nextauth]/auth-options';
import { getServerSession } from 'next-auth';

export async function getSession() {
  return await getServerSession(Options);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}
