import React from 'react'

function AlbumTitleShimmer({ }) {
    return (
        <div className='animate-pulse flex gap-x-3'>
            <div className='h-8 w-8  bg-gray-300 '  ></div>
            <div className=' flex-1 space-y-3'>
            <div className='h-2 w-full  bg-gray-300 rounded'></div>
            <div className='h-2 w-full  bg-gray-300 rounded'></div>
            </div>
        </div>
    )
}

export default AlbumTitleShimmer