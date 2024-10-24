import { Dialog, Transition } from "@headlessui/react";
import React, { useRef, Fragment } from "react";
import { IoClose } from "react-icons/io5";

const MainModel = ({ modelOpen, setModelOpen, children }) => {
  const cancelButtonRef = useRef();

  return (
    <>
      <Transition show={modelOpen} as={Fragment} appear>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto text-center"
          initialFocus={cancelButtonRef}
          onClose={() => setModelOpen(false)}
        >
            <div className="min-h-screen px-4">
                <Transition.Child 
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="absolute bg-black opacity-60"/>
                </Transition.Child>
                    <span className="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>


                <Transition.Child 
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {children}
                </Transition.Child>

                {/* <div className="absolute right-20 top-20">
                    <button
                        onClick={() => setModelOpen(false)}
                        type="button"
                        className="flex justify-center px-2 py-2 border border-transparent text-xl font-medium text-white bg-subMain rounded-full hover:bg-main hover:text-dryGray hover:font-bold"
                    >
                        <IoClose />
                    </button>
                </div> */}

            </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MainModel;
