import React, { useState, useEffect } from 'react';
import { useEffects } from '../../context';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal = ({ modalOpen = false, setModalOpen, children }: ModalProps) => {
  const { setModalBeingViewed } = useEffects();
  const [grow, setGrow] = useState<boolean>(false);
  const [initialised, setInitialised] = useState<boolean>(false);
  
  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => {
        setGrow(true);
      }, 200);
      setInitialised(true);
      setModalBeingViewed(true);
    } else {
      if (initialised) {
        setModalBeingViewed(false);
      }
      setGrow(false);
    }
  }, [modalOpen])

  return (
    <>
    {modalOpen && (
        <div
          className="fixed top-0 left-0 h-screen w-screen m-0 p-0 z-20 overflow-hidden"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className=" flex justify-center items-center pt-4 min-h-screen w-screen h-fit text-center">
            <div
              className="fixed inset-0 flex justify-center items-center bg-gray-900 backdrop-blur-sm bg-opacity-10 transition-opacity hover:cursor-pointer"
              aria-hidden="true"
              onClick={() => setModalOpen(false) }
            >
            </div>

            <div
              className={`scale-0 mx-2 ${grow ? 'scale-100 transition-all duration-500' : ''}`}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}