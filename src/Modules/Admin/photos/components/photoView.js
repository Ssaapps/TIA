import { MEDIA_URL } from "../../../../Shared/utils/constants";
import { classNames, niceBytes } from "../../../../Shared/utils/common";
import React, { useEffect, useState } from "react";
import { getMedia } from "../duck/action";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import ShimmerPhotoView from "./shimmerPhotoView";
export default function PhotoView(props) {

    const location = useLocation();
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(-1);

    const onItemClicked = (file) => {
        props.onItemClicked({ ...file, type: 'file' });
        setSelectedFile(file.id)
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const album = queryParams.get('album');
        dispatch(getMedia(album));
    }, []);



    return (
        <>
            {props.photos.length > 0 ?
                <ul
                    role="list"
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                >
                    {props.photos.map((file, index) => (
                        <li onClick={() => onItemClicked(file)} key={file.name} className="relative">
                            <div
                                className={classNames(
                                    selectedFile === file.id
                                        ? 'ring-2 ring-offset-2 ring-indigo-500'
                                        : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',
                                    'group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 dark:bg-gray-500 overflow-hidden'
                                )}
                            >

                                <img
                                    src={`${MEDIA_URL}${file.watermark_path}`}
                                    alt=""
                                    loading="lazy"
                                    className={classNames(
                                        file.current ? '' : 'group-hover:opacity-75',
                                        'object-cover pointer-events-none'
                                    )}
                                />
                                <button type="button" className="absolute inset-0 focus:outline-none">
                                    <span className="sr-only">View details for {file.name}</span>
                                </button>
                            </div>
                            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900 dark:text-gray-300">
                                {file.name}
                            </p>
                            <p className="pointer-events-none block text-sm font-medium text-gray-500 dark:text-gray-400">{niceBytes(file.size)}</p>
                        </li>
                    ))}
                </ul> : <ShimmerPhotoView />}
        </>
    )
}