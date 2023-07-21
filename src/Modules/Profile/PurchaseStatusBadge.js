import React from 'react'

export default function PurchaseStatusBadge(props) {

    if (props.status === "pending") {
        return (
            <span className="inline-flex rounded-md bg-yellow-200 px-4 py-1.5 border text-xs font-semibold leading-5 text-yellow-800">
                Pending
            </span>
        )
    }

    if (props.status === "paid") {
        return (
            <span className="inline-flex rounded-md bg-green-100 px-4 py-1.5 border text-xs font-semibold leading-5 text-green-800">
                Active
            </span>
        )
    }

    if (props.status === "cancelled") {
        return (
            <span className="inline-flex rounded-md bg-red-100 px-4 py-1.5 border text-xs font-semibold leading-5 text-red-800">
                Cancelled
            </span>
        )
    }
}
