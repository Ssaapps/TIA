import React from 'react'

function ImagePlaceHolder() {
    return (
        <div
            className="relative group flex-1 flex border-2 mt-1 dark:bg-[#131B2D]  border-gray-300 border-dashed rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 aspect-w-3 aspect-h-2 w-full"

        >     <div className="space-y-1 flex flex-1 flex-col items-center justify-center text-center px-6 pt-5 pb-6">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                >
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                {/* <div className="flex text-sm justify-center text-gray-600">
        <span
          className="text-center cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
        >
          Upload a file
        </span>
      </div> */}
                {/* <p className="text-xs text-gray-500">or drag and drop</p> */}
            </div>

        </div>
    )
}

export default ImagePlaceHolder