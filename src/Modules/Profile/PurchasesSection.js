import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { downloadReceipt, getOrders } from '../Cart/duck/action'
import Shimmer from '../../Shared/Component/Suspense/Shimmer'
import dayjs from 'dayjs'
import PurchaseStatusBadge from './PurchaseStatusBadge'
import Pagination from '../../Shared/Component/Table/Pagination'

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
            <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
                <div className="px-4 sm:px-6">
                    <h2 id="billing-history-heading" className="text-lg font-medium leading-6 text-gray-900">
                        Billing history
                    </h2>
                </div>
                <div className="mt-6 flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden border-t border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                Reference
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                                Amount
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">
                                                Status
                                            </th>
                                            {/*
          `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
        */}
                                            <th
                                                scope="col"
                                                className="relative px-6 py-3 text-left text-sm font-medium text-gray-500"
                                            >
                                                <span className="sr-only">View receipt</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {cartState.orders.loading ? [0, 0, 0, 0].map((item, index) => (
                                            <>

                                                <tr key={index}>
                                                    <td className='px-6 py-4'>
                                                        <Shimmer className={"h-4 w-[80%]"} />
                                                    </td>
                                                    <td className='px-6 py-4'>
                                                        <Shimmer className={"h-4 w-[80%]"} />
                                                    </td>
                                                    <td className='px-6 py-4'>
                                                        <Shimmer className={"h-4 w-20 mx-auto"} />
                                                    </td>
                                                    <td className='px-6 py-4 flex items-center justify-center'>
                                                        <Shimmer className={"h-4 w-24 rounded-lg"} />
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            </>
                                        )) : cartState.orders.data ? cartState.orders.data.data.map((purchase) => (
                                            <>
                                                <tr key={purchase.id}>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                        <time dateTime={purchase.create_at}>{dayjs(purchase.create_at).format("DD/MM/YYYY")}</time>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {/* {purchase.resource_name + " - " + purchase.payment_medium} */}
                                                        {purchase.payment_reference ? "#" + purchase.payment_reference : "N/A"}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 text-center py-4 text-lg font-semibold text-gray-500">
                                                        {"\u20AC" + purchase.amount}
                                                    </td>
                                                    <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                                                        <PurchaseStatusBadge status={purchase.status} />
                                                    </td>

                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        {purchase.paid_at && <a href={"#"} onClick={() => {
                                                            downloadReceipt(purchase.payment_reference)
                                                            // downloadReceipt("ddf28a11-eddc-429b-a1d8-ea105d5df625")
                                                        }} className="text-orange-600 hover:text-orange-900">
                                                            Download
                                                        </a>}
                                                    </td>
                                                </tr>
                                            </>
                                        )) : <div></div>}

                                    </tbody>
                                    {cartState.orders.data && <tfoot className='w-full'>
                                        <tr >
                                            <td colSpan={5}>
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