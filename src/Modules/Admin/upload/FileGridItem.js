import React, { useEffect } from 'react'

const FileGridItem = React.memo(function ({ file, onClick, isSelected, index, selected, setSelected, filesEditable, currentPreviewFileId, uploadedFileIds, uploading, setCurrentPreviewFileId, setFilesEditable }) {
    const [isHovering, setIsHovering] = React.useState(false);
    return (
        <li onMouseEnter={
            () => {
                setIsHovering(true)
            }
        } onMouseLeave={() => {
            setIsHovering(false)
        }} key={file.id} className={`relative hover:bg-black ${isSelected && " bg-black"} cursor-pointer px-2 pb-2`} onClick={() => {
            if (!isHovering) return
            if (currentPreviewFileId == file.id) setCurrentPreviewFileId(null)
            else setCurrentPreviewFileId(file.id)
        }} >
            <input
                onMouseEnter={
                    () => {
                        setIsHovering(false)
                    }
                }
                onMouseLeave={
                    () => {
                        setIsHovering(true)
                    }
                }
                id={`${file.id}`}
                name={`${file.id}`}
                type="checkbox"
                disabled={uploading}
                checked={isSelected}
                onChange={(e) => {
                    if (e.target.checked) {
                        setSelected([...selected, index])

                    }
                    else {

                        if (selected.includes(index)) {
                            setSelected(selected.filter((item) => item !== index))
                            return
                        }
                    }
                }}
                className="h-4 w-4 absolute top-2.5 right-5 z-10 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <div className={`group aspect-w-8 aspect-h-5 block w-full overflow-hidden rounded-lg ${uploadedFileIds.includes(file.id) && "border-green-500"} ${currentPreviewFileId == file.id && " border-pink-700"}   border-2 bg-gray-700 focus-within:ring-2  focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100`}>
                {
                    <img src={"https://cdn-icons-png.flaticon.com/512/126/126477.png"} alt={file.name} className="pointer-events-none object-contain p-10 group-hover:opacity-75" loading='lazy' />
                }
                <button type="button" className="absolute inset-0 focus:outline-none">
                    <span className="sr-only">View details for {filesEditable[index].name}</span>
                </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-100">{filesEditable[index].name}</p>
            <p className="pointer-events-none block text-sm font-medium text-gray-200">{filesEditable[index].description ? filesEditable[index].description : "Add Description"}</p>
        </li>
    )
});

export default FileGridItem