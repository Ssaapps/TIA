import React from 'react'

function AlbumTile({ title, description, tags, people, photos }) {
    return (
        <div className='flex gap-x-3 '>

            <img className='h-8 w-8  ' src="https://via.placeholder.com/120x120" />
            <div>
                <p className='text-sm text-blue-700 '>Album Name</p>
                <p className='text-xs text-blue-700'>Album Description</p>
            </div>
        </div>
    )
}

export default AlbumTile