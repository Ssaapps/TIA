import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../Cart/duck/action'
import Shimmer from '../../Shared/Component/Suspense/Shimmer'
import dayjs from 'dayjs'
import PurchaseStatusBadge from './PurchaseStatusBadge'
import Pagination from '../../Shared/Component/Table/Pagination'
import {downloadReceipt} from "../../Shared/utils/common";

const payments = [
    {
        id: 1,
        date: '1/1/2020',
        datetime: '2020-01-01',
        description: 'Business Plan - Annual Billing',
        amount: 'CA$109.00',
        href: '#',
    },
    // More payments...
]


function PurchasesSection() {
    const cartState = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        dispatch(getOrders(currentPage))
    }, [currentPage])

    return (
        <section aria-labelledby="billing-history-heading">
            <div className="bg-white pt-6 shadow  sm:overflow-hidden sm:rounded-md">
                <div className="px-4 sm:px-6">
                    <h2 id="billing-history-heading" className="text-lg font-medium leading-6 text-gray-900">
                        Billing history
                    </h2>
                </div>
                <div className="mt-6 flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden border-t  border-gray-200">
                                <table className="min-w-full divide-y  divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                                #
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                Reference
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                                Order Items
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                Date
                                            </th>
                                            {/*
          `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
        */}
                                            <th
                                                scope="col"
                                                className="relative px-6 py-3 text-center text-sm font-medium text-gray-500"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {cartState.orders.loading ? [0, 0, 0, 0].map((item, index) => (
                                            <>

                                                <tr key={index}>
                                                    <td className='px-6 py-4'>
                                                        <Shimmer className={"h-4 w-8"} />
                                                    </td>
                                                    <td className='px-6 py-4'>
                                                        <Shimmer className={"h-4 w-[80%]"} />
                                                    </td>
                                                    <td className='px-6 py-4'>
                                                        <Shimmer className={"h-4 w-[80%]"} />
                                                    </td>
                                                    <td className='px-6 py-4 flex items-center justify-center'>
                                                        <Shimmer className={"h-4 w-8"} />
                                                    </td>
                                                    <td className='px-6 py-4'>
                                                        <Shimmer className={"h-4 w-20 mx-auto"} />
                                                    </td>
                                                    <td className='px-6 py-4 flex items-center justify-center'>
                                                        <Shimmer className={"h-4 w-24 rounded-lg"} />
                                                    </td>
                                                    <td className='px-6 py-4'>
                                                        <Shimmer className={"h-4 w-20 mx-auto"} />
                                                    </td>
                                                </tr>
                                            </>
                                        )) : cartState.orders.data ? cartState.orders.data.data.map((purchase, index) => (
                                            <>
                                                <tr key={purchase.id}>
                                                    <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                                                        {((currentPage - 1) * 10) + index + 1}
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {/* {purchase.resource_name + " - " + purchase.payment_medium} */}
                                                        {purchase.payment_reference ? "#" + purchase.payment_reference : "N/A"}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 text-center py-4 text-base tracking-wide font-medium text-gray-700">
                                                        {"\u20AC" + purchase.amount}
                                                    </td>
                                                    <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                                                        {purchase.amount}
                                                    </td>
                                                    <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                                                        <PurchaseStatusBadge status={purchase.status} />
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-600">
                                                        <time dateTime={purchase.created_at}>{purchase.created_at}</time>
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm font-medium">
                                                        <button disabled={purchase.paid_at == null} onClick={() => {
                                                            downloadReceipt(purchase.payment_reference)
                                                        }} className="text-[#1e4570] disabled:hover:text-[#1e4570]cursor-pointer disabled:cursor-not-allowed  hover:text-blue-600 disabled:opacity-30">
                                                            Download
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
                                        )) : <div></div>}

                                    </tbody>
                                    {cartState.orders.data && <tfoot className='w-full'>
                                        <tr >
                                            <td colSpan={7}>
                                                <Pagination totalResults={cartState.orders.data.total} resultsPerPage={10} currentPage={currentPage} onPageChange={(currentPage) => {
                                                    setCurrentPage(currentPage)
                                                }} />
                                            </td>

                                        </tr>

                                    </tfoot>}

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PurchasesSection