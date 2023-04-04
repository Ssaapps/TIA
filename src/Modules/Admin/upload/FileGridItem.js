import React, { useEffect } from 'react'

function FileGridItem({ file, onClick, isSelected, index, selected, setSelected, filesEditable, setFilesEditable }) {

    const [preview, setPreview] = React.useState(null)
        //HOw do i read the promise result

// [[Prototype]]
// : 
// Promise
// [[PromiseState]]
// : 
// "fulfilled"
// [[PromiseResult]]
// : 
// "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA


        const getFilePreview = async () => {
        if (file.type.match("video")) {
            preview.then((generatedThumb) => {
                console.log(generatedThumb, "this is it")
                setPreview(<img src={file.generatedThumb} alt={file.name} className="pointer-events-none  object-cover group-hover:opacity-75" />
                )
            });
        }
        else{
            setPreview(<img src={file.preview} alt={file.name} className="pointer-events-none  object-cover group-hover:opacity-75" />)

        }
    }
    useEffect(() => {
       getFilePreview()
    }, [file])

    return (
        <li key={file.id} className={`relative hover:bg-black ${isSelected && " bg-black"} cursor-pointer px-2 pb-2`} onClick={() => {
            setSelected([...selected, index])
        }}>
            <div className={`group aspect-w-8 aspect-h-5 block w-full overflow-hidden rounded-lg ${isSelected && " border-pink-700"}  border-2 bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100`}>
              {preview}
                <button type="button" className="absolute inset-0 focus:outline-none">
                    <span className="sr-only">View details for {filesEditable[index].name}</span>
                </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-100">{filesEditable[index].name}</p>
            <p className="pointer-events-none block text-sm font-medium text-gray-200">{filesEditable[index].description ? filesEditable[index].description : "Add Description"}</p>
        </li>
    )
}

export default FileGridItem