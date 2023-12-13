import React from 'react'

function Shimmer({ className }) {
    return (
        <div className={`animate-pulse bg-gray-300 dark:bg-gray-500 rounded ${className}`}></div>
    )
}

export default Shimmer