import React from 'react'

function Shimmer({ className }) {
    return (
        <div className={`animate-pulse bg-gray-300 rounded ${className}`}></div>
    )
}

export default Shimmer