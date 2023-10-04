import React from 'react'
import { generateArray } from '../../../../Shared/utils/common'
import Shimmer from '../../../../Shared/Component/Suspense/Shimmer'

function ShimmerPhotoView() {
    return (
        <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
            {generateArray(12, 0).map((item, index) => (
                <li key={index} className="relative">
                    <Shimmer
                        className={
                            'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden mb-2'
                        }
                    />
                    <Shimmer className="rounded  h-[14px] w-1/2 mb-1" />
                    <Shimmer className="rounded  h-[14px] w-1/3" />
                </li>
            ))}
        </ul>
    )
}

export default ShimmerPhotoView