import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import React from 'react'

function ExploreMoreCard(props) {
    return (
        <div onClick={props.onClick} className="border cursor-pointer hover:bg-gray-200 rounded-md bg-white p-2 w-full flex items-center justify-between">
            <div className="flex gap-x-2 ">
                <img
                    src={props.img}
                    alt={props.title}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-24 sm:w-24"
                />                <div className="flex  flex-col items-start py-4">
                    <p className='font-bold'>{props.title}</p>
                    <p className="mt-1 text-sm font-medium  text-gray-700">{props.albumName}</p>

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