import React, { useState, useEffect } from 'react';

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export const Modal = ({ modalOpen, setModalOpen, children }: ModalProps) => {
  const [grow, setGrow] = useState<boolean>(false);
  
  useEffect(() => {
    if (modalOpen && children) {
      setTimeout(() => {
        setGrow(true);
      }, 200);
    } else {
      setGrow(false);
    }
  }, [modalOpen, children])

  return (
    <>
    {modalOpen && (
        <div
          className="fixed top-0 left-0 h-screen w-screen m-0 p-0 z-20 overflow-hidden"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className=" flex justify-center items-center min-h-screen w-screen h-fit text-center py-[80px]">
            <div
              className="fixed inset-0 flex justify-center items-center bg-gray-900 backdrop-blur-sm bg-opacity-10 transition-opacity hover:cursor-pointer"
              aria-hidden="true"
              onClick={() => { setModalOpen(false) }}
            >
            </div>

            <div
              className={`scale-0 ${grow ? 'scale-100 transition-all duration-500' : ''}
               bg-white h-fit w-fit max-w-[60rem] flex justify-center items-center rounded-xl overflow-visible shadow-xl`}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}