import React from 'react'

function TrendingAlbumCard({ photo, name, description }) {
  return (
    <div className=" rounded-lg border p-2 px-3  dark:border-white/20">
      <div className="rounded-lg bg-red-500 w-full h-64 ">
        <img src={photo} alt="" className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className='mt-2 space-y-'>
        <h4 className='text font-medium'>{name}</h4>
        <h4 className='text-sm text-gray-700 dark:text-gray-400/95'>{description}</h4>
      </div>
    </div>
  )
}

export default TrendingAlbumCard