import React from 'react'

function AlbumTile({ title, description, onClick }) {
    return (
        <div onClick={onClick} className='flex gap-x-3 cursor-pointer hover:bg-gray-200'>

            <img className='h-8 w-8  ' src="https://via.placeholder.com/120x120" />
            <div>
                <p className='text-sm text-blue-700 '>{title}</p>
                <p className='text-xs text-blue-700'>{description}</p>
            </div>
        </div>
    )
}

export default AlbumTile