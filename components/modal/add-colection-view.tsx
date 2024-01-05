'use client';

import { addCollection } from '@/app/_actions/collection-actions';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useSWRConfig } from 'swr';
import { useUI } from '../useUI';

interface AddCollectionProps {}

export const AddCollectionView: React.FC<AddCollectionProps> = ({}) => {
  const [input, setInput] = useState<string>();
  const { closeModal } = useUI();

  const session = useSession();

  const { mutate } = useSWRConfig();

  const hdAddCollection = async () => {
    if (!session?.data?.user?.email || !input) return null;
    try {
      await addCollection(
        session?.data?.user?.email as string,
        input as string,
      );
    } catch (error) {
      console.log('Error add collection: \n', error);
    }

    mutate('api/collection');
    closeModal();
  };

  return (
    <div className="mx-auto flex w-96 flex-col rounded-sm border border-gray-700 bg-slate-900 p-4">
      <input
        className="rounded-sm border border-gray-500 bg-gray-600 px-2 py-1 text-gray-50"
        onChange={(e) => setInput(e.target.value)}
        type="text"
        name="collection"
        placeholder="collection"
      />
      <button
        onClick={() => {
          hdAddCollection();
        }}
        className="mt-6 rounded-md bg-slate-800 py-2 text-xl font-medium text-gray-200 hover:bg-gray-600"
      >
        Add
      </button>
    </div>
  );
};
