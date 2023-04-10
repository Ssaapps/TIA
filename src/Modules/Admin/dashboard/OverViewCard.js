import React from 'react'

function OverViewCard(props) {
  return (
    <div className="bg-[#F4F6F9] rounded-lg border p-4 px-6">
    <div className="flex  gap-x-4 items-center">
        {props.icon}
        <span className='font-medium text-[15px]'>{props.text}</span>
    </div>
</div>
  )
}

export default OverViewCard