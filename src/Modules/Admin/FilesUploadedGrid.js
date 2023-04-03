import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React from 'react'

function FilesUploadedGrid({ files, setFiles, selected, setSelected, filesEditable, setFilesEditable, setAlbumAddOpen }) {
    const [isEditingTitle, setIsEditingTitle] = React.useState(false);
    const [titleEdited, setTitleEdited] = React.useState("");
    const [isEditingDescription, setIsEditingDescription] = React.useState(false);
    const [descriptionEdited, setDescriptionEdited] = React.useState("");

    return (
        <div className='py-5 h-5/6'>
            <div className="container flex mx-auto h-full">
                <div className='h-full border border-gray-600 flex-1  mr-5' style={{
                    flex: "2"
                }}>
                    <span className='block px-3 py-2 text-gray-400 border-b border-b-gray-600'>Editing {selected.length} {selected.length > 1 ? "photos" : "photo"}</span>
                    <div onClick={() => {
                        setIsEditingTitle(true)
                    }} onMouseLeave={e => setIsEditingTitle(false)} className='px-3 py-2 text-[13px] text-gray-100  border-b border-b-gray-600'>
                        {isEditingTitle ? <input className='text-black' onChange={(e) => {
                            setTitleEdited(e.target.value)
                            const filesEditablesToBeEdited = filesEditable.filter((file, index) => selected.includes(index))

                            const filesEditableCopy = [...filesEditable];
                            selected.forEach((index) => {
                                filesEditableCopy[index].name = e.target.value
                            })
                            setFilesEditable([...filesEditableCopy])

                        }} placeholder={`Replace ${files.length}  ${files.length > 1 ? "titles" : "title"}`} /> : titleEdited ? <span>{titleEdited}</span> : <span>Replace {files.length}  {files.length > 1 ? "titles" : "title"}</span>}
                    </div>
                    <div onClick={() => {
                        setIsEditingDescription(true)
                    }} onMouseLeave={e => setIsEditingDescription(false)} className='px-3 py-2 text-[13px] text-gray-100  border-b border-b-gray-600'>
                        {isEditingDescription ? <input className='text-black' onChange={(e) => {
                            setDescriptionEdited(e.target.value)
                            const filesEditablesToBeEdited = filesEditable.filter((file, index) => selected.includes(index))

                            const filesEditableCopy = [...filesEditable];
                            selected.forEach((index) => {
                                filesEditableCopy[index].description = e.target.value
                            })
                            setFilesEditable([...filesEditableCopy])

                        }} placeholder={`Replace ${selected.length}  ${selected.length > 1 ? "description" : "description"}`} /> : descriptionEdited ? <span>{descriptionEdited}</span> : <span>Replace {selected.length}  {selected.length > 1 ? "descriptions" : "description"}</span>}
                    </div>
                    <div className='px-3 py-2 text-[13px] text-gray-100 border-b border-b-gray-600'>
                        Add Tags
                    </div>

                    <div className='px-3 py-2 text-[13px] text-gray-100 border-b border-b-gray-600'>
                        Add people
                    </div>

                    <div onClick={() => {
                        setAlbumAddOpen(true)
                    }} className='cursor-pointer  px-3 py-2 text-[13px] text-gray-100 border-b border-b-gray-600'>
                        Add to albums
                    </div>

                    <div className='px-3 py-2 text-sm text-gray-100 border-b border-b-gray-600'>
                        Add to groups
                    </div>
                    <div className='px-3 py-2 text-[13px] text-gray-100 border-b  '>
                        <div className="flex items-center mb-2">Owner Settings <ChevronDownIcon className='text-gray-100 w-2 h-2 ml-2' /></div>
                        <span> &#169;</span> All rights reserved
                        <br />
                        <div className="flex items-center gap-x-1 mt-2">
                            <div className='bg-green-400 h-3 w-3 rounded-sm'></div>
                            <span>Visible to everyone</span>
                        </div>
                    </div>


                </div>
                <div style={{
                    flex: "9"
                }}>
                    <ul role="list" className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {files.map((file, index) => {
                            const isSelected = selected.includes(index);
                            return (<li key={file.id} className={`relative hover:bg-black ${isSelected && " bg-black"} cursor-pointer px-2 pb-2`} onClick={() => {
                                setSelected([...selected, index])
                            }}>
                                <div className={`group aspect-w-8 aspect-h-5 block w-full overflow-hidden rounded-lg ${isSelected && " border-pink-700"}  border-2 bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100`}>
                                    <img src={file.preview} alt={file.name} className="pointer-events-none  object-cover group-hover:opacity-75" />
                                    <button type="button" className="absolute inset-0 focus:outline-none">
                                        <span className="sr-only">View details for {filesEditable[index].name}</span>
                                    </button>
                                </div>
                                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-100">{filesEditable[index].name}</p>
                                <p className="pointer-events-none block text-sm font-medium text-gray-200">{filesEditable[index].description ? filesEditable[index].description : "Add Description"}</p>
                            </li>
                            )
                        }
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FilesUploadedGrid