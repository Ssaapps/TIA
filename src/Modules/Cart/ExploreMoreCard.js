import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

function ExploreMoreCard(props) {
    return (
        <div className="border cursor-pointer hover:bg-gray-200 rounded-md bg-white p-2 w-full flex items-center justify-between">
            <div className="flex gap-x-2 items-center">
                <img src={props.img} alt="" className="rounded-md h-16 w-16 border" />
                <div className="flex  flex-col items-start">
                    <p className='font-bold'>{props.title}</p>
                    <p className='text-sm text-gray-500'>{props.description}</p>
                </div>
            </div>
            <div className="flex gap-x-2 items-center">
                <div className="flex gap-y-2 flex-col ">
                    <p className='font-medium text-xl'>{"\u20AC" + props.price}</p>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-600" />
            </div>
        </div>
    )
}

export default ExploreMoreCard