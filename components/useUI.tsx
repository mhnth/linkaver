'use client';

import React, { ReactNode, useContext, useReducer } from 'react';

interface State {
  displayModal: boolean;
  modalView: string;
}

const initialState = {
  displayModal: false,
  modalView: 'Right',
};

type MODAL_VIEWS = 'collection' | 'link' | 'Center';

type Action =
  | {
      type: 'OPEN_MODAL';
    }
  | {
      type: 'CLOSE_MODAL';
    }
  | {
      type: 'SET_MODAL_VIEW';
      view: MODAL_VIEWS;
    };

const UIContext = React.createContext<State | any>(false);

const uiReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      };
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      };
    }
  }
};

export const UIProvider: React.FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openModal = () => dispatch({ type: 'OPEN_MODAL' });

  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

  const setModalView = (view: MODAL_VIEWS) => {
    console.log('input modal', view);

    dispatch({ type: 'SET_MODAL_VIEW', view: view });
  };

  const value = {
    ...state,
    openModal,
    closeModal,
    setModalView,
  };
  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context == undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }

  return context;
};
