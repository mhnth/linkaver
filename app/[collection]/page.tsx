'use client';

import { getLinks } from '@/lib/fetcher';
import useSWR from 'swr';

export default function Page({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const {
    data: links,
    isLoading,
    error,
  } = useSWR(`api/collection/${params.collection}`, getLinks);

  if (isLoading) return <div>loading...</div>;
  return (
    <div className="mx-auto w-full max-w-[758px]">
      {links?.map((l, i) => {
        return (
          <div
            key={i}
            className="mt-4 flex justify-between rounded-sm border border-gray-800 bg-gray-900 px-3 py-2"
          >
            <a href={`https://${l.link}`} target="_blank" className="w-1/2">
              {l.link}
            </a>
            <div>
              <button className="font-light text-sky-500">Edit</button>
              <button className="ml-2 font-light text-red-400 opacity-90">
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
