'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useUI } from '@/components/useUI';
import useSWR, { useSWRConfig } from 'swr';
import { fetcherCollections } from '@/lib/fetcher';
import Logo from '@/components/logo';

export default function Home() {
  const session = useSession();

  const { openModal, setModalView } = useUI();
  const {
    data: collections,
    error,
    isLoading,
  } = useSWR('api/collection', fetcherCollections);

  const hdAddCollection = () => {
    setModalView('collection');
    openModal();
  };

  const hdAddLink = () => {
    setModalView('link');
    openModal();
  };

  if (!session.data)
    return (
      <div>
        please <Link href={'/signup'}>Sign Up</Link>
      </div>
    );

  return (
    <main className="mx-auto w-full max-w-[758px]">
      <div className="fixed bottom-0 w-full max-w-[758px] bg-slate-900 bg-opacity-50 py-3">
        <div className="mx-auto flex w-full max-w-[400px] items-center justify-between">
          <button
            className="w-28 rounded-md border-2 border-transparent px-3 py-1 text-gray-50
                      hover:text-gray-100 hover:underline"
            onClick={() => hdAddCollection()}
          >
            +Collection
          </button>
          <button
            onClick={() => hdAddLink()}
            className="w-28 rounded-md border-2 border-gray-50 bg-gray-50 px-2 py-1 text-slate-900 hover:bg-gray-200"
          >
            +Link
          </button>
          <button className="w-28 hover:underline" onClick={() => signOut()}>
            -Sign out
          </button>
        </div>
      </div>

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
