import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React from 'react'
import FileGridItem from './FileGridItem';

function FilesUploadedGrid({ files, setFiles, selected, setSelected, filesEditable, setFilesEditable, setAlbumAddOpen }) {
    const [isEditingTitle, setIsEditingTitle] = React.useState(false);
    const [titleEdited, setTitleEdited] = React.useState("");
    const [isEditingDescription, setIsEditingDescription] = React.useState(false);
    const [descriptionEdited, setDescriptionEdited] = React.useState("");
    const [isEditingTags, setIsEditingTags] = React.useState(false);



    return (
        <div className='py-5 h-5/6'>
            <div className="container flex mx-auto h-full">
                <div className='h-full border border-gray-600 bg-b flex-1  mr-5' style={{
                    flex: "2"
                }}>
                    {selected.length > 0 ? <span className='block px-3 py-2 text-gray-400 border-b border-b-gray-600'> Editing {selected.length} {selected.length > 1 ? "photos" : "photo"}</span> :


                        <span className='block px-3 py-2 text-gray-400 '> Select Files to Edit</span>

                    }
                    {selected.length > 0 && (
                        <>
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

                                }} placeholder={`Replace ${selected.length}  ${selected.length > 1 ? "titles" : "title"}`} /> : titleEdited ? <span>{titleEdited}</span> : <span>Replace {selected.length}  {selected.length > 1 ? "titles" : "title"}</span>}
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
                            <div onClick={() => {
                                setIsEditingTags(true)
                            }} onMouseLeave={e => setIsEditingTags(false)} className='px-3 py-2 text-[13px] text-gray-100  border-b border-b-gray-600'>
                                <span>Add tags</span>
                                <div className='flex items-center gap-x-1'>

                                    {
                                        filesEditable.find((file, index) => selected.includes(index)).tags.map((tag, index) => (

                                            <div key={index} className='bg-gray-600 px-2 py-1 rounded-sm'>
                                                <span>{tag}</span>
                                            </div>


                                        )
                                        )
                                    }
                                </div>

                                {isEditingTags && <input className='text-black' onEnter onChange={(e) => {
                                    const filesEditablesToBeEdited = filesEditable.filter((file, index) => selected.includes(index))
                                    const filesEditableCopy = [...filesEditable];
                                    selected.forEach((index) => {
                                        const tagsArrayInput = e.target.value.split(" ").filter((tag) => tag !== "");
                                        filesEditableCopy[index].tags = tagsArrayInput

                                    })
                                    setFilesEditable([...filesEditableCopy])

                                }} placeholder={`Seperate tags with space`} />}
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

                        </>
                    )}
                </div>
                <div style={{
                    flex: "9"
                }}>
                    <ul role="list" className="grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {files.map((file, index) => {
                            const isSelected = selected.includes(index);
                            return (
                                <FileGridItem key={index} file={file} index={index} isSelected={isSelected} setSelected={setSelected} selected={selected} filesEditable={filesEditable} setFilesEditable={setFilesEditable} />
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