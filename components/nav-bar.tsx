import { signOut } from 'next-auth/react';
import React from 'react';
import { useUI } from './useUI';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { openModal, setModalView } = useUI();

  const hdAddCollection = () => {
    setModalView('collection');
    openModal();
  };

  const hdAddLink = () => {
    setModalView('link');
    openModal();
  };

  return (
    <div className="fixed bottom-0 left-1/2 w-full max-w-[758px] -translate-x-1/2 bg-slate-900 bg-opacity-50 py-3">
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
  );
};
