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

  const hdDeleteCollection = async (id: string) => {};

  if (!session.data) return <div></div>;

  return (
    <main className="mx-auto w-full max-w-[758px]">
      {/* collections */}
      <div className="mt-6 px-2">
        {collections &&
          collections.map((c, i) => {
            return (
              <div
                className="mt-4 flex justify-between rounded-sm border border-gray-800 bg-gray-900 
                           px-3 py-2 hover:border-gray-700"
              >
                <Link href={c.id} className="w-1/2" key={i}>
                  {c.name}
                </Link>
                <div>
                  <div>
                    <button className="font-light text-sky-500">Edit</button>
                    <button
                      onClick={() => hdDeleteCollection(c.id)}
                      className="ml-2 font-light text-red-400 opacity-90"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
