import { PhotoIcon, } from '@heroicons/react/20/solid'
import { FolderPlusIcon } from '@heroicons/react/24/outline'
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
            paymentGateWayFormRef.current.querySelector('input[name="COM"]').value = data.payment_data.form_params.COM;
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
                    <FolderPlusIcon className="h-16 w-16 text-gray-400 mb-4" />

                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-300  mb-2">No items in cart</h2>
                    <p className="text-gray-500">Start adding items to your cart and they'll appear here</p>
                </div>
                }


                <div className="bg-white dark:bg-gray-900 transition duration-300">
                    {cartState.items.length > 0 && <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-200">CART SUMMARY</h1>
                        <form onSubmit={handleCheckout} className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                            <section aria-labelledby="cart-heading" className="lg:col-span-7">
                                <h2 id="cart-heading" className="sr-only">
                                    Items in your  cart
                                </h2>

                                <ul role="list" className="divide-y divide-gray-200 border border-b   rounded  border-gray-200">
                                    {cartState.items.map((media, productIdx) => (
                                        <li key={media.id} className="flex items-stretch py-4 px-4 sm:py-4">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={`${MEDIA_URL}${media.watermark_path}`}
                                                    alt={media.name}
                                                    className="h-24 w-24 rounded-md object-cover object-center sm:h-40 sm:w-40 "
                                                />
                                            </div>

                                            <div className="ml-4 py-1  flex-1  sm:ml-6">
                                                <h3 className="flex justify-between b text-lg font-semibold break-all text-gray-900 hover:text-gray-800 dark:text-gray-300">
                                                    {media.original_name}

                                                </h3>
                                                <div className=" pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>

                                                        <Link to={`/album/${media.album.uuid}`}>
                                                            <p className="mt-1 text-sm font-medium  text-gray-700 dark:text-gray-300">{media.album.name}</p>

                                                        </Link>
                                                        <p className="mt-1 flex space-x-2 text-sm text-gray-700">
                                                            <PhotoIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                                                            <span className='text-sm text-gray-700 dark:text-gray-400'>{convertToKBorMBorGB(media.size)}</span>

                                                        </p>
                                                        <dd className="text-lg tracking-wide mt-2.5 font-semibold text-gray-900 dark:text-gray-200">{'\u20AC' + media.item_price.price}</dd>

                                                    </div>


                                                </div>


                                            </div>
                                            <div className='flex items-center  '>
                                                <button onClick={() => {
                                                    dispatch(removeItemFromCart(media))
                                                }} type="button" className=" inline-flex p-5 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-500 dark:hover:bg-gray-600 hover:dark:text-gray-300">
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
                                className="mt-16 rounded-lg bg-gray-50  dark:bg-[#131B2D] border-white/5 border px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                            >
                                <h2 id="summary-heading" className="text-lg font-medium text-gray-900 dark:text-gray-300">
                                    Order summary
                                </h2>

                                <dl className="mt-6 space-y-4">
                                    {/* <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-600">Subtotal</dt>
                                    <dd className="text-sm font-medium text-gray-900">$99.00</dd>
                                </div> */}
                                    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-500 pt-4">
                                        <dt className="flex items-center text-sm text-gray-600 dark:text-gray-200">
                                            <span>Files</span>
                                            {/* <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                            <span className="sr-only">Learn more about how shipping is calculated</span>
                                            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                        </a> */}
                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900 dark:text-gray-300">{cartState.items.length + ` image${cartState.items.length > 1 ? "s" : ""}`}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-500 pt-4">
                                        <dt className="flex text-sm text-gray-600 dark:text-gray-200">
                                            <span>Total Size</span>

                                        </dt>
                                        <dd className="text-sm font-medium text-gray-900 dark:text-gray-300">{computeTotalMb()}</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-500 pt-4">
                                        <dt className="text-base font-medium text-gray-900 dark:text-gray-200">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-gray-300">{'\u20AC' + computeCartTotal()}</dd>
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
                            <input type="hidden" name="CN" value="" />
                            <input type="hidden" name="COM" value="" />
                            <input type="hidden" name="CURRENCY" value="" />
                            <input type="hidden" name="LANGUAGE" value="" />
                            <input type="hidden" name="ORDERID" value="" />
                            <input type="hidden" name="PSPID" value="" />
                            <input type="hidden" name="SHASIGN" value="" />
                        </form>
                    </div>
                    }
                </div>
            </CustomLoadingOverlay >
        </>

    )
}
