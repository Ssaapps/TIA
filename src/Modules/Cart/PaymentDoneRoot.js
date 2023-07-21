import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import Shimmer from '../../Shared/Component/Suspense/Shimmer'
import { useDispatch, useSelector } from 'react-redux'
import { checkOrderStatus } from './duck/action'
import PaymentFailureScreen from './PaymentFailureScreen'
import PaymentSuccessScreen from './PaymentSuccess'

function PaymentDoneRoot() {
    const { id } = useParams()
    const cartState = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    console.log(id)
    useEffect(() => {
        if (!cartState.status.data || !cartState.status.error) {
            dispatch(checkOrderStatus(id))
        }

    }, [])
    return (
        <>
            {cartState.status.loading ?
                (<div className=" items-center justify-center h-screen bg-gray-100 pt-[5%]">
                    <div className="flex flex-col gap-y-5 w-[80%] md:w-[60%] sm:w-[70%]  lg:w-[40%] text-center items-center mx-auto">
                        <Shimmer className={"w-24 h-24  rounded-full"} />
                        <Shimmer className={"w-[40%]  h-3"} />
                        <Shimmer className={"w-[70%]  h-5"} />
                        <Shimmer className={"w-[60%]  h-4"} />
                        <Shimmer className={"w-[60%] mt-6 rounded-md  h-16"} />
                        <Shimmer className={"w-[60%] rounded-md  h-16"} />
                    </div>
                </div>) : cartState.status.error ? <PaymentFailureScreen /> : cartState.status.data ? <PaymentSuccessScreen data={cartState.status.data} /> : <div>   </div>}
        </>
    )
}

export default PaymentDoneRoot