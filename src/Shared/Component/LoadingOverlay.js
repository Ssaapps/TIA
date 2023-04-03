import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { PropagateLoader } from 'react-spinners';
// import { AiOutlineLoading } from 'react-icons/ai';

const CustomLoadingOverlay = ({ spinner, text, show, setShow, next }) => {
    // const [show, setShow] = useState(false);

    useEffect(() => {
        if (show == true) {
            setTimeout(() => {
                setShow(false);
                next()
            }, 3000)
        }
    }, [show]);

    return (
        <Transition
            show={show}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">

                <div className="flex items-center justify-center space-x-2 text-white">
                    {spinner ? spinner : <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>}

                    <span>{text ? text : "Loading...."}  </span>
                </div>
            </div>
        </Transition>
    );
};

export default CustomLoadingOverlay;