import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import FilesUploadedGrid from "./FilesUploadedGrid";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import UploadConfirmDialog from "./UploadConfirmDialog";
import { v5 as uuidv5, v4 as uuidv4 } from "uuid";
import EnterAlbumActionPane from "./EnterAlbumNameInputActionPanel";
import { useNavigate } from "react-router";
import { doSetFiles, doSetFilesEditable, doSetSelected, uploadMedia } from "./duck/action";
import { useDispatch, useSelector } from "react-redux";
import RemoveDialog from "./RemoveDialog";
import Axios from "../../../Shared/utils/axios_instance";
import EnterGroupsActionPane from "./EnterGroupsNameInputActionPanel";
import EnterPeopleActionPane from "./EnterPeopleNameInputActionPanel";
import { default as UploadLoadingOverlay } from "../../../Shared/Component/CustomLoadingOverlay";
import ErrorAlert from "../../../Shared/Component/Alert/Error";
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import SuccessAlert from "../../../Shared/Component/Alert/Success";

function Upload() {

    const dispatch = useDispatch();
    const { files, filesEditable, selected, media, } = useSelector(state => state.upload)
    const abortControllerRef = useRef(new AbortController())
    const [currentPreviewFileId, setCurrentPreviewFileId] = useState(null)
    const [errorType, setErrorType] = useState(null)
    const [initialFilesCount, setInitialFilesCount] = useState(null)
    const [filesUploadedCount, setFilesUploadedCount] = useState(0)
    const [uploadedFileIds, setUploadedFileIds] = useState([])
    const token = JSON.parse(localStorage.getItem("token") ?? "{}")

    const [dialogOpen, setDialogOpen] = useState(false);
    const [uploadProgress, setUploadingProgress] = useState(null)
    const [uploading, setUploading] = useState(false);
    const [albumAddOpen, setAlbumAddOpen] = useState(false);
    const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
    const [albumAddFormOpen, setAlbumAddFormOpen] = useState(false);
    const [groupAddFormOpen, setGroupsAddFormOpen] = useState(false);
    const [peopleAddFormOpen, setPeopleAddFormOpen] = useState(false);
    const uploadAreaRef = useRef()
    const [currentFileUploading, setCurrentFileUploading] = useState(null)
    const [retryCount, setRetryCount] = useState(0)
    const [fileUploadBegins, setFileUploadBegins] = useState(false)
    const [currentUploadSpeed, setCurrentUploadSpeed] = useState(null)


    const [uploadError, setUploadError] = useState(null)
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
        if (errorType == "Network Error") {
            handleUpload()
        }
    }, [errorType])




    useEffect(() => {
        console.log("media changes", media)
    }, [media]);
    const onDrop = (acceptedFiles) => {
        if (files.length === 0) {
            setFiles(
                acceptedFiles.map((file) =>
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
                        tags: [],
                        album: null,
                        people: null,
                        group: null
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
                    tags: [],
                    album: null,
                    people: null,
                    group: null
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


    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        const handleOnline = () => {
            if (files.length > 0 && uploading && retryCount < 10) {
                abortControllerRef.current = new AbortController();
                handleUpload();
            }
        };
        const handleOffline = () => {
            if (uploading) {
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }

            }
        };

        // window.addEventListener("online", handleOnline);
        // window.addEventListener("offline", handleOffline);
        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);

        };
    }, [files, uploading, retryCount]);



    const handleUpload = async () => {
        setDialogOpen(false)
        setFileUploadBegins(true)
        setUploading(true)

        let errorOccured = false;
        setErrorType(null)
        if (initialFilesCount == null) {
            setInitialFilesCount(files.length)
        }
        const filesUploaded = []
        function formatUploadSpeed(speed) {
            if (speed >= 1000000000) {
                return (speed / 1000000000).toFixed(2) + " Gbps";
            } else if (speed >= 1000000) {
                return (speed / 1000000).toFixed(2) + " Mbps";
            } else if (speed >= 1000) {
                return (speed / 1000).toFixed(2) + " Kbps";
            } else {
                return speed.toFixed(2) + " B/s";
            }
        }

        // const newAbortController = new AbortController();
        // setAbortController(newAbortController);
        const tempFilesUploadedIds = [];
        for (var fileIndex in files) {
            const file = files[fileIndex]
            setCurrentFileUploading(+fileIndex + 1)
            const fileConf = filesEditable[fileIndex];
            let data = {
                method: "form-data",
            };
            if (fileConf.tags) {
                data["tags"] = fileConf.tags
            }
            if (fileConf.album) {
                data["album_id"] = fileConf.album.id
            }
            if (fileConf.amount) {
                data["amount"] = fileConf.amount
            }
            if (fileConf.amount) {
                data["name"] = fileConf.name
            }
            if (fileConf.amount) {
                data["description"] = fileConf.description
            }
            const formData = new FormData();
            formData.append("file", file);
            Object.keys(data).forEach((item, index) => {
                formData.append(item, Object.values(data)[index])
            })
            try {
                let startTime = Date.now(); // Record the start time
                await axios.post("https://photos.uipmworld.org/api/v1/admin/media", formData, {
                    headers: {
                        Authorization: "Bearer " + token?.access_token ?? "",
                        'Content-Type': 'multipart/form-data',
                    },


                    timeout: 0,


                    signal: abortControllerRef.current?.signal,
                    onUploadProgress: (progressEvent) => {
                        let currentTime = Date.now();

                        const elapsedTime = (currentTime - startTime) / 1000;
                        console.log(elapsedTime)

                        const bytesUploaded = progressEvent.loaded;
                        const bytesTotal = progressEvent.total;
                        const speed = (bytesUploaded / elapsedTime) * 8; // Speed in bits per second
                        const formattedSpeed = formatUploadSpeed(speed);
                        setCurrentUploadSpeed(formattedSpeed);

                        const percentage = (progressEvent.loaded * 100) / progressEvent.total;
                        setUploadingProgress(Math.round(+percentage))
                    }
                })
                filesUploaded.push(+fileIndex)
                tempFilesUploadedIds.push(file.id)
            }

            catch (err) {
                console.log(err)
                //Filter by filesUploaded and remove them from files and filesEditable
                const newFiles = files.filter((file, index) => !filesUploaded.includes(index))
                setFilesUploadedCount(filesUploaded.length)
                console.log(newFiles)
                console.log(filesUploaded)
                const newFilesEditable = filesEditable.filter((file, index) => !filesUploaded.includes(index))
                setFiles(newFiles)

                setFilesEditable(newFilesEditable)


                if (err.message === "canceled") {
                    errorOccured = true;
                    setUploadError("Connection is unstable")
                    break;
                }
                else {
                    setUploading(false)
                    setDialogOpen(false)
                    setUploadError("An error occured while uploading files")
                }


                errorOccured = true;
                break
            }
            console.log("filesUploaded", tempFilesUploadedIds)
            setUploadedFileIds(tempFilesUploadedIds)

        }
        if (!errorOccured) {
            navigate("/admin/upload/success");
            setUploading(false);
            setFiles([]);
            setSelected([]);
            setFilesEditable([]);
        }

    }






    return (
        <div
            {...getRootProps({
                onClick: (event) => event.stopPropagation(),
            })}
            className='bg-gray-950 h-full'
            style={{
                backgroundImage: `url(https://combo.staticflickr.com/pw/images/editr-marc-by-marc-perry.png)`,
            }}
        >

            {/* <React.Fragment>
                <p className="font-medium mb-2 text-white text-sm">Uploading file {filesUploadedCount == null ? currentFileUploading : currentFileUploading + filesUploadedCount} of {initialFilesCount == null ? files.length : initialFilesCount}</p>
                <div class="w-[300px] bg-gray-200 rounded-full dark:bg-gray-700">
                    {!!uploadProgress && <div class="bg-blue-600 text-sm font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{
                       width: `${uploadProgress}%`
                  }}> {`${uploadProgress}%`}</div>}
              </div>
           </React.Fragment>  */}
            <SuccessAlert timeout={4000} message="Upload has began" open={fileUploadBegins} onClose={() => {
                setFileUploadBegins(false)
            }} />



            <EnterAlbumActionPane setOpen={setAlbumAddFormOpen} open={albumAddFormOpen} filesEditable={filesEditable} selected={selected} setSelected={setSelected} setFilesEditable={setFilesEditable} />
            <EnterGroupsActionPane setOpen={setGroupsAddFormOpen} open={groupAddFormOpen} filesEditable={filesEditable} selected={selected} setSelected={setSelected} setFilesEditable={setFilesEditable} />
            <EnterPeopleActionPane setOpen={setPeopleAddFormOpen} open={peopleAddFormOpen} filesEditable={filesEditable} selected={selected} setSelected={setSelected} setFilesEditable={setFilesEditable} />
            <div className='bg-gray-100 py-2 '>
                <div className='container mx-auto flex justify-between'>
                    <div className='flex gap-x-3'>
                        <button onClick={open} disabled={uploading} title="Upload files" className='text-gray-600 text-sm flex gap-x-1 px-2  border hover:border-gray-400 border-transparent items-center'>
                            <PlusIcon className='w-4 h-4 text-green-500' /> Add
                        </button>
                        {files.length > 0 && (
                            <button disabled={uploading} onClick={() => {
                                if (selected.length > 0) {
                                    onRemoveTap()
                                }
                            }} title="remove selected files" className='text-gray-600 text-sm flex gap-x-1 px-2  border hover:border-gray-400 items-center'>
                                <MinusIcon className='w-4 h-4 text-red-500' /> Remove
                            </button>
                        )}
                        {files.length > 0 && (
                            <button className='text-gray-600  border-transparent text-sm flex gap-x-1 px-2  items-center'>
                                <input
                                    disabled={uploading}
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
                        disabled={files < 1 || uploading}
                        onClick={
                            () => { setDialogOpen(true) }
                        }
                        className='text-[13px] text-gray-100 px-3 py-1 rounded-md  bg-blue-700 disabled:text-gray-500 disabled:bg-transparent '
                    >
                        Upload {files.length > 0 ? files.length : ""}{" "}
                        {files.length < 0 ? "" : files.length > 1 ? "files" : "file"}
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
                    uploadedFileIds={uploadedFileIds}
                    setFilesEditable={setFilesEditable}
                    setAlbumAddFormOpen={setAlbumAddFormOpen}
                    uploading={uploading}
                    currentPreviewFileId={currentPreviewFileId}
                    setCurrentPreviewFileId={setCurrentPreviewFileId}
                    setGroupsAddFormOpen={setGroupsAddFormOpen}
                    setPeopleAddFormOpen={setPeopleAddFormOpen}
                />
            ) : (
                <React.Fragment>
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
                </React.Fragment>
            )}

            {uploading && <div style={{
                width: document.getElementById("upload-area").clientWidth,
            }} className="mx-auto justify-between flex items-center`">
                <div>
                    <p className="font-medium  text-white text-lg mb-1">Uploading file {filesUploadedCount == null ? currentFileUploading : currentFileUploading + filesUploadedCount} of {initialFilesCount == null ? files.length : initialFilesCount}</p>
                    <p className=" text-base text-white">Speed:  {currentUploadSpeed}</p>
                </div>
                <div className={"p-2 mb-2"} style={
                    {
                        width: 80,
                        height: 80
                    }
                }>
                    {uploadProgress && <CircularProgressbar value={uploadProgress} text={`${uploadProgress}%`} styles={{
                        path: {
                            stroke: "#1d43d8",
                            strokeLinecap: "round",

                        },
                        text: {
                            fill: "#fff",
                            color: "#fff"
                        },

                    }} />}

                </div>
            </div>

            }

            <UploadConfirmDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                itemsCount={files.length}
                onContinue={handleUpload}

            />

            <RemoveDialog
                open={removeDialogOpen}
                setOpen={setRemoveDialogOpen}
                onConfirm={onRemoveConfirm}
            />
            <ErrorAlert timeout={10000} open={!!uploadError} onClose={() => setUploadError(null)} message={uploadError} />
        </div>


    );
}

export default Upload;
