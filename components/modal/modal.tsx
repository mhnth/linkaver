'use client';

import { cx } from '@/lib/utils';
import React, { HTMLAttributes, ReactNode } from 'react';
import { useUI } from '../useUI';
import { AddCollectionView } from './add-colection-view';
import { AddLinkView } from './add-link-view';

interface modalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isVisible?: boolean;
  variant?: 'left' | 'right' | 'center';
  onOutsideClick: () => void;
}

export const Modal: React.FC<modalProps> = ({
  children,
  isVisible,
  variant,
  onOutsideClick,
  ...rest
}) => {
  return (
    <div
      onClick={() => onOutsideClick()}
      className={cx(
        'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25',
      )}
    >
      <div className="" onClick={(e) => e.stopPropagation()} {...rest}>
        {children}
      </div>
    </div>
  );
};

const ModelView: React.FC<{
  modalView: string;
  closeModal: () => void;
}> = ({ modalView, closeModal }) => {
  console.log('view', modalView);

  return (
    <Modal onOutsideClick={closeModal}>
      {modalView === 'collection' && <AddCollectionView />}
      {modalView === 'link' && <AddLinkView />}
    </Modal>
  );
};

export const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();

  return displayModal ? (
    <ModelView modalView={modalView} closeModal={closeModal} />
  ) : null;
};
