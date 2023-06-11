/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { CheckIcon, ClockIcon, PhotoIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeItemFromCart } from './duck/action'




export default function Cart() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.items)
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Cart</h1>
                <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your  cart
                        </h2>

                        <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                            {cart.map((album, productIdx) => (
                                <li key={album.id} className="flex py-6 sm:py-10">
                                    <div className="flex-shrink-0">
                                        <img
                                            src={`https://7206-154-160-11-174.ngrok-free.app${album.media[0].path}`}
                                            alt={album.name}
                                            className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                            <div>
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm">
                                                        <a href={album.href} className="font-medium text-gray-900 hover:text-gray-800">
                                                            {album.name}
                                                        </a>
                                                    </h3>
                                                </div>

                                                <p className="mt-1 text-sm font-medium text-gray-700">{album.description}</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0 sm:pr-9">


                                                <div className="absolute top-0 right-0">
                                                    <button onClick={() => {
                                                        dispatch(removeItemFromCart(album))
                                                    }} type="button" className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                                                        <span className="sr-only">Remove</span>
                                                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">

                                            <PhotoIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />



                                            <span>{album.media.length > 1 ? `${album.media.length} photos` : `${album.media.length} photo`}</span>
                                        </p>
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
                            <div className="flex items-center justify-between">
                                <dt className="text-sm text-gray-600">Subtotal</dt>
                                <dd className="text-sm font-medium text-gray-900">$99.00</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how shipping is calculated</span>
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">$5.00</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Learn more about how tax is calculated</span>
                                        <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </dt>
                                <dd className="text-sm font-medium text-gray-900">$8.32</dd>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <dt className="text-base font-medium text-gray-900">Order total</dt>
                                <dd className="text-base font-medium text-gray-900">$112.32</dd>
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
            </div>
        </div>
    )
}
