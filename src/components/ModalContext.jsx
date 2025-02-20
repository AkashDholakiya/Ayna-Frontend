'use client';

import { createContext, useContext, useState } from 'react';

const ModalContext = createContext({
  modalType: null,
  openModal: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => setModalType(type);
  const closeModal = () => {setModalType(null);};

  return (
    <ModalContext.Provider value={{ modalType, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);