import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import FilesUploadedGrid from "./FilesUploadedGrid";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import UploadConfirmDialog from "./UploadConfirmDialog";
import UploadingLoadingOverlay from "./UploadingLoadingOverlay";
import { v5 as uuidv5, v4 as uuidv4 } from "uuid";
import LoadingOverlay from "react-loading-overlay";
import { PropagateLoader } from "react-spinners";
import CustomLoadingOverlay from "../../../Shared/Component/LoadingOverlay";
import EnterAlbumActionPane from "./EnterAlbumNameInputActionPanel";
import { useNavigate } from "react-router";
import { doSetFiles, doSetFilesEditable, doSetSelected } from "./duck/action";
import { useDispatch, useSelector } from "react-redux";
import RemoveDialog from "./RemoveDialog";

  
function Upload() {
    const dispatch = useDispatch();
    const {files, filesEditable, selected} = useSelector(state => state.upload)

    const [dialogOpen, setDialogOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [albumAddOpen, setAlbumAddOpen] = useState(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [albumAddFormOpen, setAlbumAddFormOpen] = useState(false);
    const [thumbs, setThumbs] = useState([])
    const navigate = useNavigate()
  
    const setFiles = (files) => {
        dispatch(doSetFiles(files))
    }

    const setFilesEditable = (filesEditable) => {
        dispatch(doSetFilesEditable(filesEditable))
    }

    const setSelected = (selectedFiles) => {
        dispatch(doSetSelected(selectedFiles))
    }
    useEffect(() => {
        if (uploading) {
            setTimeout(() => {
                setUploading(false);
            }, 5000);
        }
    }, [uploading]);
    const onDrop = (acceptedFiles) => {
        if (files.length == 0) {
            setFiles(
                acceptedFiles.map(  (file) =>
                // file.match("video") console.log("this is a video file");
                    Object.assign(file, {
                        id: uuidv4(),

                    })
                )
            );
            setFilesEditable(
                acceptedFiles.map((file) => {
                    return {
                        name: file.name,
                        description: "",
                        tags: []
                    };
                })
            );
        } else {
            const tempFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    id: uuidv4(),
                })
            );
            const tempFilesEditable = acceptedFiles.map((file) => {
                return {
                    name: file.name,
                    description: "",
                    tags : []
                };
            });

            setFiles([...files, ...tempFiles]);
            setFilesEditable([...filesEditable, ...tempFilesEditable]);
        }
    };

    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
        onDrop,

        accept: {
            "image/*": [],
            "video/*": [],
        },

    });

    const onRemoveTap = () => {
        setRemoveDialogOpen(true)
    }
    const onRemoveConfirm = () => {
        setFiles(files.filter((file, index) => !selected.includes(index)));
        setFilesEditable(filesEditable.filter((file, index) => !selected.includes(index)));
        setSelected([]);
    }


    return (


        <div
            {...getRootProps({
                onClick: (event) => event.stopPropagation(),
            })}
            className='bg-gray-950 h-full '
            style={{
                backgroundImage: `url(https://combo.staticflickr.com/pw/images/editr-marc-by-marc-perry.png)`,
            }}
        >
            {/* Album loading overlay */}
            <CustomLoadingOverlay setShow={setAlbumAddOpen} next={() => {
                setAlbumAddFormOpen(true)
            }} show={albumAddOpen} spinner={<PropagateLoader color="#fff" />} text=" " />

            {/*  Files loading overlay */}

            <CustomLoadingOverlay setShow={setUploading} next={() => {
                navigate("/upload/success")
            }} show={uploading} spinner={<PropagateLoader color="#fff" />} text=" " />
            <EnterAlbumActionPane setOpen={setAlbumAddFormOpen} open={albumAddFormOpen} />
            <div className='bg-gray-100 py-2'>
                <div className='container mx-auto flex justify-between'>
                    <div className='flex gap-x-3'>
                        <button title="Upload files" className='text-gray-600 text-sm flex gap-x-1 px-2  border hover:border-gray-400 border-transparent items-center'>
                            <PlusIcon className='w-4 h-4 text-green-500' /> Add
                        </button>
                        {files.length > 0 && (
                            <button onClick={()=>{
                                console.log("taps remoce    ")
                                if(selected.length > 0){
                                    onRemoveTap()
                                }
                            }} title="remove selected files" className='text-gray-600 text-sm flex gap-x-1 px-2  border hover:border-gray-400 items-center'>
                                <MinusIcon className='w-4 h-4 text-red-500' /> Remove
                            </button>
                        )}
                        {files.length > 0 && (
                            <button className='text-gray-600  border-transparent text-sm flex gap-x-1 px-2  items-center'>
                                <input
                                    checked={files.length == selected.length}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelected(files.map((file, index) => index));
                                        } else {
                                            setSelected([]);
                                        }
                                    }}
                                    type='checkbox'
                                    name=''
                                    id=''
                                />
                                Select All
                            </button>
                        )}
                    </div>
                    <button
                        disabled={files < 1}
                        onClick={
                            () => { setDialogOpen(true) }
                        }
                        className='text-[13px] text-gray-100 px-3 py-1 rounded-md  bg-blue-700 disabled:text-gray-500 disabled:bg-transparent '
                    >
                        Upload {files.length > 0 ? files.length : ""}{" "}
                        {files.length < 0 ?  "" : files.length > 1 ? "files" : "file"}
                    </button>
                </div>
            </div>
            {isDragActive ? (
                <div className='grid h-5/6 place-items-center'>
                    <p className='text-center text-gray-600 font-bold text-2xl'>
                        Drop the files here ...
                    </p>
                </div>
            ) : files.length > 0 ? (
                <FilesUploadedGrid
                    files={files}
                    setFiles={setFiles}
                    selected={selected}
                    setSelected={setSelected}
                    filesEditable={filesEditable}
                    setFilesEditable={setFilesEditable}
                    setAlbumAddOpen={setAlbumAddOpen}
                />
            ) : (
                <>
                    <section className='text-center py-32'>
                        <h4 className='text-gray-300 text-2xl font-bold'>
                            Drag & drop photos and videos here
                        </h4>
                        <span className='text-white block mt-5 text-xl font-semibold'>
                            Or
                        </span>
                        <button
                            onClick={open}
                            className='text-shadow text-white block my-5 text-xl font-semibold mx-auto px-3 py-2 bg-blue-700 drop-shadow-sm	rounded-sm'
                        >
                            Choose photos and videos to upload
                        </button>
                        <input {...getInputProps()} />
                        {/* <input {...getInputProps()} type="file" name="" id="file" /> */}
                    </section>
                </>
            )}
        
            <UploadConfirmDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                itemsCount={files.length}
                onContinue={() => {
                    setUploading(true);
                }}
            />

            <RemoveDialog 
            open={removeDialogOpen}
            setOpen={setRemoveDialogOpen}
            onConfirm={onRemoveConfirm}
            />
        </div>


    );
}

export default Upload;
