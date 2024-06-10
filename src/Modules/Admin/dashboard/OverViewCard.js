import React from 'react'

function OverViewCard(props) {
  return (
    <div className="bg-[#F4F6F9] dark:bg-[#131B2D] dark:border-white/10 rounded-lg border p-4 px-6">
      <div className="flex  gap-x-4 items-center">
        {props.icon}
        <span className='font-medium text-[15px] dark:text-gray-300/95'>{props.text}</span>
      </div>
    </div>
  )
}

export default OverViewCard