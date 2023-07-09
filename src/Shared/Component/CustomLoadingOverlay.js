import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { PropagateLoader } from 'react-spinners';
import LoadingOverlay from 'react-loading-overlay';
// import { AiOutlineLoading } from 'react-icons/ai';

const CustomLoadingOverlay = ({ spinner, text, show, setShow, children, next, color }) => {

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                // setShow(false);
                next && next()
            }, 3000)
        }
    }, [show]);

    return (
        <LoadingOverlay
            active={show}
            spinner={spinner ?? <div> <PropagateLoader color={color} /> <div className='h-10'></div></div>}
            styles={{
                overlay: (base) => ({
                    ...base,
                    width: '100vw',
                    height: '100vh',
                    position: "fixed",
                    overflow: 'hidden'
                })
            }}
            text={text ?? "Loading..."}

        >
            {children}
        </LoadingOverlay>
    );
};

export default CustomLoadingOverlay;