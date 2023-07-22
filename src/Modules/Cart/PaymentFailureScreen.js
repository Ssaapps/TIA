import React, { useEffect, useRef } from 'react';
import ExploreMoreCard from './ExploreMoreCard';
import AnimatedErrorAlertIcon from '../../Shared/Component/Icons/AnimatedErrorAlertIcon';

const PaymentFailureScreen = ({ text }) => {

    return (
        <div className=" items-center justify-center h-screen bg-gray-100 pt-[5%]">
            <div className="flex flex-col gap-y-5 w-[40%] text-center mx-auto">

                <div className="w-full py-3 mt-0 mb-0 relative" >
                    <AnimatedErrorAlertIcon className="mx-auto" height={100} width={100} />
                </div>


                <h4 className="font-medium text-3xl tracking-wide">{text}</h4>
                <div className="flex items-center mt-8 justify-center">
                    <button onClick={() => {
                        window.location.replace("/")
                    }} className="bg-[#1e4570] hover:bg-blue-700 text-white font-bold py-2 px-8 rounded">
                        Go to Home
                    </button>
                </div>
            </div>


        </div >
    );
};

export default PaymentFailureScreen;