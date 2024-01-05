'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { fetcherCollections } from '@/lib/fetcher';

export default function Home() {
  const session = useSession();

  const {
    data: collections,
    error,
    isLoading,
  } = useSWR('api/collection', fetcherCollections);

  if (!session.data) return <div></div>;

  return (
    <main className="mx-auto w-full max-w-[758px]">
      {/* collections */}
      <div className="mt-6 px-2">
        {collections &&
          collections.map((c, i) => {
            return (
              <Link
                href={c.id}
                className="mt-2 block cursor-pointer rounded-sm bg-slate-700 px-3 py-2 text-gray-50 shadow-md"
                key={i}
              >
                {c.name}
              </Link>
            );
          })}
      </div>
    </main>
  );
}
