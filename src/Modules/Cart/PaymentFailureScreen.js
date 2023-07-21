import React, { useEffect, useRef } from 'react';
import ExploreMoreCard from './ExploreMoreCard';
import AnimatedErrorAlertIcon from '../../Shared/Component/Icons/AnimatedErrorAlertIcon';

const PaymentFailureScreen = () => {

    return (
        <div className=" items-center justify-center h-screen bg-gray-100 pt-[5%]">
            <div className="flex flex-col gap-y-5 w-[40%] text-center mx-auto">

                <div className="w-full py-3 mt-0 mb-0 relative" >
                    <AnimatedErrorAlertIcon className="mx-auto" height={100} width={100} />
                </div>


                <h4 className="font-medium text-3xl tracking-wide">Payment was not successful!</h4>

            </div>


        </div >
    );
};

export default PaymentFailureScreen;