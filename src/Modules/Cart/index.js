import { PhotoIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { checkout, removeItemFromCart } from './duck/action'
import { MEDIA_URL } from "../../Shared/utils/constants";
import { useEffect, useRef, useState } from 'react';
import CustomLoadingOverlay from '../../Shared/Component/CustomLoadingOverlay';
import ErrorAlert from '../../Shared/Component/Alert/Error';
import { useNavigate, Link } from "react-router-dom";
import { convertToKBorMBorGB } from '../../Shared/utils/common';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useLocation } from "react-router";

import DatePicker from "react-datepicker";



export default function Cart() {
    const dispatch = useDispatch()
    const location = useLocation();
    const cartState = useSelector((state) => state.cart)
    const paymentGateWayFormRef = useRef()
    const isAuth = !!useSelector((state) => state.login.login.token);
    const [checkoutError, setCheckoutError] = useState(null)

    const navigate = useNavigate();

    const handleCheckout = (e) => {
        e.preventDefault();
        if (!isAuth) {
            navigate('/login', {
                state: { from: location }
            });
        }
        dispatch(checkout(cartState.items, async (data) => {
            paymentGateWayFormRef.current.action = data.payment_data.link
            paymentGateWayFormRef.current.querySelector('input[name="AMOUNT"]').value = data.payment_data.form_params.AMOUNT;
            paymentGateWayFormRef.current.querySelector('input[name="CURRENCY"]').value = data.payment_data.form_params.CURRENCY;
            paymentGateWayFormRef.current.querySelector('input[name="LANGUAGE"]').value = data.payment_data.form_params.LANGUAGE;
            paymentGateWayFormRef.current.querySelector('input[name="ORDERID"]').value = data.payment_data.form_params.ORDERID;
            paymentGateWayFormRef.current.querySelector('input[name="PSPID"]').value = data.payment_data.form_params.PSPID;
            paymentGateWayFormRef.current.querySelector('input[name="SHASIGN"]').value = data.payment_data.form_params.SHASIGN;
            paymentGateWayFormRef.current.querySelector('input[name="CN"]').value = data.payment_data.form_params.CN;
            await paymentGateWayFormRef.current.submit()
        }, (error) => {
            console.log(error)
            console.log(cartState.checkout)
        }))
    }
    useEffect(() => {
        if (cartState.checkout.error) {
            setCheckoutError(cartState.checkout.error)
        }
    }, [cartState])

    const computeCartTotal = () => {
        const totalPrice = cartState.items.reduce((acc, obj) => acc + (obj.item_price.price || 0), 0);
        return totalPrice;
    }
    const computeTotalMb = () => {
        const totalSize = cartState.items.reduce((acc, obj) => acc + (obj.size || 0), 0);
        return convertToKBorMBorGB(totalSize);
    }

    return (
        <>
            <ErrorAlert open={!!checkoutError} message={checkoutError} onClose={() => {
                setCheckoutError(null)
            }} />
            <CustomLoadingOverlay show={cartState.checkout.loading} color={"#fff"} text={"Processing...."}>

                {cartState.items.length < 1 && <div className="flex justify-center items-center flex-col mt-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-16 w-16 text-gray-400 mb-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">No items in cart</h2>
                    <p className="text-gray-500">Start adding items to your cart and they'll appear here</p>
                </div>
                }


                <div className="bg-white">
                    {cartState.items.length > 0 && <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl">CART SUMMARY</h1>
                        <form onSubmit={handleCheckout} className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                            <section aria-labelledby="cart-heading" className="lg:col-span-7">
                                <h2 id="cart-heading" className="sr-only">
                                    Items in your  cart
                                </h2>

                                <ul role="list" className="divide-y divide-gray-200 border border-b grid  rounded  border-gray-200">
                                    {cartState.items.map((media, productIdx) => (
                                        <li key={media.id} className="flex items-stretch py-4 px-4 sm:py-4">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={`${MEDIA_URL}${media.watermark_path}`}
                                                    alt={media.name}
                                                    className="h-24 w-24 rounded-md object-cover object-center sm:h-40 sm:w-40"
                                                />
                                            </div>

                                            <div className="ml-4 py-1 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-lg">
                                                                <span className="font-semibold text-gray-900 hover:text-gray-800">
                                                                    {media.original_name}
                                                                </span>
                                                            </h3>
                                                        </div>
                                                        <Link to={`/album/${media.album.uuid}`}>
                                                            <p className="mt-1 text-sm font-medium  text-gray-700">{media.album.name}</p>

                                                        </Link>
                                                        <p className="mt-1 flex space-x-2 text-sm text-gray-700">
                                                            <PhotoIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                                                            <span className='text-sm text-gray-700'>{convertToKBorMBorGB(media.size)}</span>

                                                        </p>
                                                        <dd className="text-lg tracking-wide mt-2.5 font-semibold text-gray-900">{'\u20AC' + media.item_price.price}</dd>

                                                    </div>


                                                </div>


                                            </div>
                                            <div className='flex items-center  '>
                                                <button onClick={() => {
                                                    dispatch(removeItemFromCart(media))
                                                }} type="button" className=" inline-flex float-right p-5 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">Remove</span>
                                                    <TrashIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Order summary */}
                            <section

                                aria-labelledby="summary-heading"
                                className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                            >
                                <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                    Order summary
                                </h2>

                                <dl className="mt-6 space-y-4">
                                    {/* <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-600">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">$99.00</dd>
                                </div> */}
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="flex items-center text-sm text-gray-600">
                                            <span>Files</span>
                                            {/* <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Learn more about how shipping is calculated</span>
                                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                        </a> */}
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">{cartState.items.length + ` image${cartState.items.length > 1 ? "s" : ""}`}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="flex text-sm text-gray-600">
                                            <span>Total Size</span>

                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900">{computeTotalMb()}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900">{'\u20AC' + computeCartTotal()}</dd>
                                    </div>
                                </dl>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            </section>
                        </form>
                        <form action="" ref={paymentGateWayFormRef} className='hidden'>
                            <input type="hidden" name="AMOUNT" value="" />
                            <input type="hidden" name="CURRENCY" value="" />
                            <input type="hidden" name="LANGUAGE" value="" />
                            <input type="hidden" name="ORDERID" value="" />
                            <input type="hidden" name="PSPID" value="" />
                            <input type="hidden" name="SHASIGN" value="" />
                            <input type="hidden" name="CN" value="" />
                        </form>
                    </div>
                    }
                </div>
            </CustomLoadingOverlay >
        </>

    )
}
