import React, { useEffect, useRef, useState } from 'react'
import {
    HeartIcon,
} from '@heroicons/react/24/outline'
import {
    Bars4Icon,
    PencilIcon,
    PlusIcon as PlusIconMini,
    Squares2X2Icon as Squares2X2IconMini,
    ChevronDoubleUpIcon



} from '@heroicons/react/20/solid'
import {
    HomeIcon as HomeOutlined
} from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from "react-redux";
import { deleteMedia, featureMedia, getMedia, setAlbumCover } from "./duck/action";
import { MEDIA_URL } from "../../../Shared/utils/constants";
import { classNames, niceBytes } from "../../../Shared/utils/common";
import moment from "moment";
import YesNoDialog from "../../../Shared/Component/Dialog/YesNoDialog";
import PhotoView from "./components/photoView";
import AlbumView from "./components/albumView";
import JavInput from '../../../Shared/Component/Forms/JavInput';
import Zoom from 'react-medium-image-zoom'
import LoadingIcon from '../../../Shared/Component/Icons/LoadingIcon';
import SuccessAlert from '../../../Shared/Component/Alert/Success';
import ErrorAlert from '../../../Shared/Component/Alert/Error';

const initialTabs = [
    { id: 0, name: 'Photo ', href: '#', current: true },
]

function PhotosList() {

    const dispatch = useDispatch();
    const [currentFile, setCurrentFile] = useState(null);
    const photosListContainerRef = useRef(null)
    const [showScrollToTopBtn, setShowScrollToTopBtn] = useState(false)
    const [selectedItemModel, setSelectItemModel] = useState(null);
    const photoState = useSelector((state) => state.media)
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [tabs, setTabs] = useState(initialTabs)
    const [editingPrice, setEditingPrice] = useState(false)

    const onItemClicked = (file) => {
        console.log("file is ", file)
        setEditingPrice(false)
        setCurrentFile({
            type: file.type,
            id: file.id,
            name: file.name,
            size: file.type === 'file' ? niceBytes(file.size) : file.media_count + " files",
            source: `${MEDIA_URL}${file.watermark_path}`,
            price: file.item_price?.price,
            information: {
                'Uploaded by': file.created_by?.name ?? '',
                'Created at ': moment(file.created_at).format("MMM D, YYYY"),
                'Last modified': moment(file.updated_at).format("MMM D, YYYY"),
                Dimensions: '4032 x 3024',
                Resolution: '72 x 72',
            },
            sharedWith: [

            ]
        });
    }

    const handleEditPriceSubmit = (e) => {
        e.preventDefault()
        const itemToEditId = currentFile.id;
        //TODO: Handle edit price backend call

    }

    useEffect(() => {
        console.log("photoState", photoState?.fetch?.data?.filter(it => it.featured_media !== null));
        if (photoState.delete.success) {
            setSelectItemModel(null);
            setCurrentFile(null);
            dispatch(getMedia());
        }
    }, [photoState])


    return (
        <div className="flex flex-1 items-stretch overflow-hidden relative">
            {<button onClick={() => {
                if (photosListContainerRef) {
                    photosListContainerRef.current?.scroll(0, 0)
                }
            }} className={`w-[40px] h-[40px] bg-indigo-600 rounded-[5px] z-[99999] flex items-center justify-center absolute  right-[408px] ${showScrollToTopBtn ? "bottom-5" : "-bottom-40"} transition `} type='button'>
                < ChevronDoubleUpIcon className='text-white h-5 ' />
            </button>}
            <YesNoDialog
                open={selectedItemModel != null}
                title={"Are you sure ?"}
                yesLoading={false}
                onYesClicked={() => {
                    dispatch(deleteMedia(selectedItemModel.id))

                }}
                onNoClicked={() => setSelectItemModel(null)}
                onCloseClicked={() => setSelectItemModel(null)}
            >
                <div className="text-xs py-3">
                    Are you sure you want to delete photo ?
                </div>
            </YesNoDialog>
            <SuccessAlert open={success != null} message={success} timeout={3000} onClose={() => setSuccess(null)} />
            <ErrorAlert open={error != null} message={error} timeout={3000} onClose={() => setError(null)} />



            <main className="flex-1 overflow-y-auto scroll-smooth" ref={photosListContainerRef} onScroll={(e) => {
                if (e.currentTarget.scrollTop == 0) {
                    setShowScrollToTopBtn(false)
                }
                else if (showScrollToTopBtn == true) {
                    return
                }
                else {
                    setShowScrollToTopBtn(true)
                }
            }}>

                <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 ">
                    <div className="flex">
                        <h1 className="flex-1 text-2xl font-bold text-gray-900 dark:text-gray-200">Photos</h1>
                        <div className="ml-6 flex items-center rounded-lg bg-gray-100 p-0.5 sm:hidden">
                            <button
                                type="button"
                                className="rounded-md p-1.5 text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                <Bars4Icon className="h-5 w-5" aria-hidden="true" />
                                <span className="sr-only">Use list view</span>
                            </button>
                            <button
                                type="button"
                                className="ml-0.5 rounded-md bg-white p-1.5 text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            >
                                <Squares2X2IconMini className="h-5 w-5" aria-hidden="true" />
                                <span className="sr-only">Use grid view</span>
                            </button>
                        </div>
                    </div>


                    {/* Tabs */}
                    <div className="mt-3 sm:mt-2">
                        <div className="sm:hidden">
                            <label htmlFor="tabs" className="sr-only">
                                Select a tab
                            </label>
                            {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                            <select
                                id="tabs"
                                name="tabs"
                                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                defaultValue="Recently Viewed"
                            >
                                <option>Recently Viewed</option>
                                <option>Recently Added</option>
                                <option>Favorited</option>
                            </select>
                        </div>
                        <div className="hidden sm:block">
                            <div className="flex items-center border-b border-gray-200 dark:border-none">
                                <nav className="-mb-px flex flex-1 space-x-6 xl:space-x-8" aria-label="Tabs">
                                    {tabs.map((tab, index) => (
                                        <a
                                            onClick={() => {
                                                setTabs(tabs.map(it => ({
                                                    ...it,
                                                    current: it.name === tab.name
                                                }))
                                                );
                                            }}
                                            key={tab.name}
                                            href={tab.href}
                                            aria-current={tab.current ? 'page' : undefined}
                                            className={classNames(
                                                tab.current
                                                    ? 'border-indigo-500 text-indigo-600'
                                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                            )}
                                        >
                                            {tab.name}
                                        </a>
                                    ))}
                                </nav>
                                <div className="ml-6 hidden items-center rounded-lg bg-gray-100 p-0.5 sm:flex">

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gallery */}
                    <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                        <h2 id="gallery-heading" className="sr-only">
                            Recently viewed
                        </h2>


                        {
                            tabs.map(item => {
                                if (item.current && item.id === 0) {
                                    return <PhotoView
                                        onItemClicked={onItemClicked}
                                        photos={photoState.fetch.data}
                                    />
                                } else if (item.current && item.id == 1) {
                                    return <AlbumView
                                        onItemClicked={onItemClicked}
                                    />
                                } else {
                                    return
                                }
                            })
                        }


                    </section>


                </div>
            </main>

            {/* Details sidebar */}

            <aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 p-8 lg:block">

                {
                    currentFile == null ? <div className='w-full h-full flex  items-center flex-col justify-center'>

                        <h2 className="text-2xl font-semibold text-gray-900 mb-2 dark:text-gray-300">No image selected</h2>
                        <p className="text-gray-500 dark:text-gray-400">Selected image details would appear here</p>
                    </div> :
                        <div className="space-y-6 pb-16">
                            <div>
                                <Zoom wrapElement='div' className="aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg dark:bg-gray-900">
                                    <img src={currentFile.source} alt="" className="object-cover" />
                                </Zoom>
                                <div className="mt-4 flex items-start justify-between">
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900 dark:text">
                                            <span className="sr-only">Details for </span>
                                            {currentFile.name}
                                        </h2>
                                        <p className="text-sm font-medium text-gray-500">{currentFile.size}</p>
                                    </div>
                                    <div className='flex gap-x-2'>

                                        <button
                                            type="button"
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <HeartIcon className="h-6 w-6" aria-hidden="true" />
                                            <span className="sr-only">Favorite</span>
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Information</h3>
                                <dl className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                                    {Object.keys(currentFile.information).map((key) => (
                                        <div key={key} className="flex justify-between py-3 text-sm font-medium">
                                            <dt className="text-gray-500">{key}</dt>
                                            <dd className="whitespace-nowrap text-gray-900">{currentFile.information[key]}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Description</h3>
                                <div className="mt-2 flex items-center justify-between">
                                    <p className="text-sm italic text-gray-500">Add a description to this image.</p>
                                    <button
                                        type="button"
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                        <span className="sr-only">Add description</span>
                                    </button>
                                </div>
                            </div>


                            <div>
                                <h3 className="font-medium text-gray-900">Price</h3>
                                <form onSubmit={handleEditPriceSubmit} className="mt-2 flex items-center justify-between">
                                    {editingPrice ? <>
                                        <div className="flex items-center gap-x-2.5">
                                            <span className={"  text-gray-600 text-lg"}>&#8364;</span>
                                            <JavInput
                                                type={"number"}
                                                className="[&input]:text-base"
                                                height={"h-8"}
                                                width={"w-1/2"}
                                                name={"price"}
                                                defaultValue={+currentFile.price}
                                            />
                                        </div>
                                        <div className="flex gap-x-2">
                                            <button
                                                type='button'
                                                onClick={() => {
                                                    setEditingPrice(false)
                                                }}
                                                className="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Save
                                            </button>
                                        </div>

                                    </> : <>
                                        <span className={"  text-gray-600 text-lg"}>&#8364; {currentFile.price}</span>
                                        <button
                                            type="button"
                                            onClick={() => setEditingPrice(true)}
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                            <span className="sr-only">Add description</span>
                                        </button>
                                    </>}


                                </form>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Feature</h3>
                                <div className="mt-2 flex items-center justify-between">
                                    {/* TODO: Check if item is featured already and not display */}
                                    <button
                                        onClick={() => {
                                            dispatch(featureMedia(currentFile.id, () => {
                                                setSuccess("Featured successfully")
                                            }, () => {
                                                setError("Failed to feature")
                                            }))
                                        }}

                                        disabled={photoState?.featuring?.loading}
                                        type="button"
                                        className="flex-1 flex justify-center items-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        {!photoState?.featuring?.loading ? "Feature on Home" : <LoadingIcon className="w-5 h-5 fill-white" />}
                                    </button>
                                    {/* TODO: Check if item is featured already and not display */}
                                    <button
                                        onClick={() => {
                                            dispatch(setAlbumCover(currentFile.id, () => {
                                                setSuccess("Set as album cover successfully")
                                            }, () => {
                                                setError("Failed to set as album cover")
                                            }))
                                        }}
                                        disabled={photoState?.setAlbumCover?.loading}
                                        type="button"
                                        className="ml-3 flex-1 flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        {!photoState?.setAlbumCover?.loading ? "Set as album cover" : <LoadingIcon className="w-5 h-5 fill-gray-700" />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Shared with</h3>
                                <ul role="list" className="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200">
                                    {currentFile.sharedWith.map((person) => (
                                        <li key={person.id} className="flex items-center justify-between py-3">
                                            <div className="flex items-center">
                                                <img src={person.imageUrl} alt="" className="h-8 w-8 rounded-full" />
                                                <p className="ml-4 text-sm font-medium text-gray-900">{person.name}</p>
                                            </div>
                                            <button
                                                type="button"
                                                className="ml-6 rounded-md bg-white text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Remove<span className="sr-only"> {person.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                    <li className="flex items-center justify-between py-2">
                                        <button
                                            type="button"
                                            className="group -ml-1 flex items-center rounded-md bg-white p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 text-gray-400">
                                                <PlusIconMini className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                                                Share
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </div>


                            <div className="flex">
                                <button
                                    type="button"
                                    className="flex-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Download
                                </button>
                                <button
                                    onClick={() => {
                                        setSelectItemModel(currentFile)
                                    }}
                                    type="button"
                                    className="ml-3 flex-1 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                }

            </aside>


        </div >
    )
}

export default PhotosList