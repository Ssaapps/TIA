import React, { useEffect } from 'react'
import { BeatLoader, BounceLoader, FadeLoader } from 'react-spinners';
import {
    generateVideoThumbnails,
    importFileandPreview
} from "@rajesh896/video-thumbnails-generator";

function FileGridItem({ file, onClick, isSelected, index, selected, setSelected, filesEditable, setFilesEditable }) {

    const [preview, setPreview] = React.useState(null)
    const [settingPreview, setSettingPreview] = React.useState(true)
    // const generateVideoPreview = async (videoFile) => {
    //     // let generatedThumb ;
    //     // return generateVideoThumbnails(videoFile, 1).then((thumbs) => {
    //     //     console.log("Video thumbs is")
    //     //     setThumbs(thumbs)
    //     //     generatedThumb = thumbs[0]
    //     //     return generatedThumb
    //     //   });
    //     const thumbResult = await generateVideoThumbnails(videoFile, 1)
    //     return thumbResult[0]
    // }

    //HOw do i read the promise result


    const getFilePreview = async () => {

        if (file.type.match("video")) {
            generateVideoThumbnails(file, 1).then((thumbs) => {
                setPreview(<img src={thumbs[0]} alt={file.name} className="pointer-events-none  object-cover group-hover:opacity-75" />)
                setSettingPreview(false)
            })
        }
        else {
            setPreview(<img src={URL.createObjectURL(file)} alt={file.name} className="pointer-events-none  object-cover group-hover:opacity-75" />)
            setSettingPreview(false)

        }
    }
    useEffect(() => {
        getFilePreview()
    }, [file])

    return (
        <li key={file.id} className={`relative hover:bg-black ${isSelected && " bg-black"} cursor-pointer px-2 pb-2`} onClick={() => {
            if(selected.includes(index)){
                setSelected(selected.filter((item) => item !== index))
                return
            }
            setSelected([...selected, index])
        }}>
            <div className={`group aspect-w-8 aspect-h-5 block w-full overflow-hidden rounded-lg ${isSelected && " border-pink-700"}  border-2 bg-gray-700 focus-within:ring-2  focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100`}>
                {/* {preview} */}
                {settingPreview ? <div className='h-full flex items-center justify-center'>
                    <BeatLoader className='my-auto' color='#fff' size={15} />
                </div> : (preview)}
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