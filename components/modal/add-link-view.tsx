'use client';

import { addLink } from '@/app/_actions/link-action';
import { fetcherCollections } from '@/lib/fetcher';
import { cx } from '@/lib/utils';
import React, { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useUI } from '../useUI';

interface AddLinkProps {}

export const AddLinkView: React.FC<AddLinkProps> = ({}) => {
  const { closeModal } = useUI();
  const {
    data: collections,
    error,
    isLoading,
  } = useSWR('api/collection', fetcherCollections);
  const { mutate } = useSWRConfig();

  const collectionId = window.location.pathname;

  const [err, setErr] = useState<boolean>(false);

  const [rows, setRows] = useState<{ link: string; collection: string }[]>([
    { link: '', collection: collections?.length ? collections[0].name : '' },
  ]);

  const hdAddLink = async () => {
    setErr(false);
    const filteredRows = rows.filter(
      (row) => row.link !== '' && row.collection !== '',
    );

    if (filteredRows.length < 1) return;

    try {
      await addLink(filteredRows);
    } catch (error) {
      setErr(true);

      setTimeout(function () {
        setErr(false);
      }, 3000);

      console.log('Error add collection: \n', error);
    }

    mutate(`api/collection${collectionId}`);
    closeModal();
  };

  const hdChangeRowInput = (
    index: number,
    link: string,
    collection = collections ? collections[0].name : '',
  ) => {
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = {
        link,
        collection: collection,
      };
      return newRows;
    });
  };

  const hdSelectChange = (
    index: number,
    selectedCollection = collections ? collections[0].name : '',
  ) => {
    hdChangeRowInput(index, rows[index].link, selectedCollection);
  };

  const hdAddRow = () => {
    const newRows = [
      ...rows,
      { link: '', collection: collections?.length ? collections[0].name : '' },
    ];

    setRows(newRows);
  };

  return (
    <div className="mx-auto flex w-96 flex-col rounded-sm border border-gray-700 bg-slate-900 p-4">
      {/* snackbar */}
      <div id="snackbar" className={cx(err && 'show', 'bg-red-700 px-4 py-6')}>
        Fail! Something went wrong!
      </div>

      <div>Add Link</div>
      {rows?.map((r, i) => {
        return (
          <div key={i} className="mt-2 flex gap-2">
            <input
              className="rounded-sm border border-gray-500 bg-gray-600 px-2 py-1 text-gray-50"
              onChange={(e) => hdChangeRowInput(i, e.target.value)}
              type="text"
              placeholder="example.com"
              name="link"
              id=""
            />
            <select
              id=""
              className="block w-full rounded-sm border border-gray-500 bg-gray-600 px-2 py-1 
                         text-sm text-gray-50 focus:border-gray-300 focus:ring-gray-500"
              onChange={(e) => hdSelectChange(i, e.target.value)}
            >
              {collections &&
                collections?.map((c, i) => {
                  return (
                    <option key={i} value={c.name}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>
        );
      })}

      <button
        onClick={() => hdAddRow()}
        className="mx-auto mt-4 w-max text-gray-50 hover:text-gray-400"
      >
        +Row
      </button>
      <button
        onClick={() => {
          hdAddLink();
        }}
        className="mt-6 rounded-md bg-slate-800 py-2 text-xl font-medium text-gray-200 hover:bg-gray-600"
      >
        Add
      </button>
    </div>
  );
};
