import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getCurrentUser();

  console.log('u', user);

  if (!user) redirect('/signin');
  redirect('/dashboard');
  return <h1>My Page</h1>;
}
