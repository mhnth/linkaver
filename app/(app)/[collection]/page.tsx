'use client';

import { getLinks } from '@/lib/fetcher';
import useSWR, { useSWRConfig } from 'swr';
import { deleteLink } from '@/app/_actions/link-action';

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
  const { mutate } = useSWRConfig();

  if (isLoading) return <div>loading...</div>;

  const hdDeleteLink = async (id: string) => {
    await deleteLink(id);

    mutate(`api/collection/${params.collection}`);
  };

  return (
    <div className="mx-auto w-full max-w-[758px]">
      {links?.map((l, i) => {
        return (
          <div
            key={i}
            className="mt-4 flex justify-between rounded-sm border border-gray-800 bg-gray-900 px-3 py-2"
          >
            <a href={`${l.link}`} target="_blank" className="w-1/2">
              {l.link}
            </a>
            <div>
              <button className="font-light text-sky-500">Edit</button>
              <button
                onClick={() => hdDeleteLink(l.id)}
                className="ml-2 font-light text-red-400 opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
