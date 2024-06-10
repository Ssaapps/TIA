import EyeIcon from "../../Shared/Component/Icons/EyeIcon";
import CashIcon from "../../Shared/Component/Icons/CashIcon";
import ClockIcon from "../../Shared/Component/Icons/ClockIcon";
import CameraIcon from "../../Shared/Component/Icons/CameraIcon";
import { useNavigate, useParams, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getAlbum } from "../Admin/albums/duck/action";
import { getMedia, getMediaDetails } from "../Admin/photos/duck/action";
import { downloadReceipt, flattenObject, getLighterColor } from "../../Shared/utils/common";
import { purchaseMedia } from "./duck/action";
import { MEDIA_URL } from "../../Shared/utils/constants";
import { addItemToCart } from "../Cart/duck/action";
import SuccessAlert from "../../Shared/Component/Alert/Success";
import Shimmer from "../../Shared/Component/Suspense/Shimmer";
import MetaDisplayDialog from "./MetaDisplayDialog";
import { ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import JavButton from "../../Shared/Component/Buttons/JavButton";
import ErrorAlert from "../../Shared/Component/Alert/Error";

export default function Photo() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()
    const params = useParams();
    const [downloading, setDownloading] = useState(false);
    const mediaState = useSelector((state) => state.media)
    const photoDetailState = useSelector((state) => state.photo_detail)
    const [metaDetails, setMetaDetails] = useState(null)
    const [itemAddedMessage, setItemAddedMessage] = useState(null)
    const [metaDialogOpen, setMetaDialogOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    useEffect(() => {
        dispatch(getMediaDetails(params.id))
        console.log("location", location)
        // console.log(history)
    }, [location.pathname])

    useEffect(() => {
        if (mediaState.show.data?.meta) {
            console.log(mediaState.show)
            console.log(JSON.parse(mediaState.show.data.meta))
            setMetaDetails(JSON.parse(mediaState.show.data.meta))

        }

    }, [mediaState])

    useEffect(() => {
        console.log("photoDetailState", photoDetailState)
        if (photoDetailState.purchase.success) {
            openInNewTab(photoDetailState.purchase.data.url)
        }
    }, [photoDetailState])

    const onPaymentClicked = () => {
        dispatch(purchaseMedia(params.id))
    };


    const onAddToCartClicked = () => {
        if (mediaState.show.data?.item_price?.price > 0) {
            dispatch(addItemToCart(mediaState.show.data, (itemAlreadyInCart) => {
                let message = itemAlreadyInCart ? "Item already in cart" : "Item Added to cart"
                setItemAddedMessage(message)
            }))
        } else {
            setMessage("starting download...");
            setDownloading(true);
            downloadReceipt(null, `media/${mediaState.show.data.id}/download`).then(res => {
                setDownloading(false);
                setMessage("download successfully")
            }).catch(async err => {
                console.log("error is ", err)
                let errorMessage = "Error trying to download file";
                if (err.response?.data) {
                    let errorData = await err.response.data.text();
                    errorMessage = JSON.parse(errorData).message;
                }
                setMessage(null);
                setError(errorMessage);
                setDownloading(false);
            });
        }

    }
    // useEffect(() => {
    //     if (itemAdded) {
    //         setTimeout(() => {
    //             setItemAdded(false)
    //         }, [3000])
    //     }
    // }, [itemAdded])

    const goTo = (to) => {
        console.log("TO [ressed")
        const itemIdex = mediaState.show.data.media_list.findIndex(item => item.id === mediaState.show.data.id)
        switch (to) {
            case 'next':
                console.log("next")
                if (itemIdex === mediaState.show.data.media_list.length - 1) {
                    console.log("next", "1")
                    navigate(`/photo/${mediaState.show.data.media_list[0].id}`, {
                        replace: true
                    })
                }
                else {
                    console.log("next", "2")

                    navigate(`/photo/${mediaState.show.data.media_list[itemIdex + 1].id}`)
                }
            case 'prev':
                if (itemIdex === 0) {
                    navigate(`/photo/${mediaState.show.data.media_list[mediaState.show.data.media_list.length - 1].id}`)
                }
                else {
                    navigate(`/photo/${mediaState.show.data.media_list[itemIdex - 1].id}`)
                }
        }
    }

    return (
        <div>

            {mediaState.show.data && <MetaDisplayDialog open={metaDialogOpen} setOpen={setMetaDialogOpen} metaObj={flattenObject(JSON.parse(mediaState.show.data.meta))} />}
            <SuccessAlert open={!!itemAddedMessage} message={itemAddedMessage} onClose={() => {
                setItemAddedMessage(null)
            }} />
            <SuccessAlert open={!!message} message={message} onClose={() => {
                setMessage(null)
            }} />
            <ErrorAlert open={!!error} message={error} onClose={() => {
                setError(null)
            }} />
            <div className={"px-10 mt-10 mb-5 gap-x-5 flex items-center"}>
                {/* <span className={"px-2 mr-2 text-sm  bg-gray-100 rounded border"}>
                    new
                </span> */}
                <div className="flex items-center justify-center">
                    <button onClick={() => {
                        navigate(`/album/${mediaState.show.data.album.uuid}`);
                    }} className="bg-[#1e4570] hover:bg-blue-700 dark:hover:bg-indigo-700 dark:bg-indigo-800 text-white font-medium text-xs py-2 px-4 flex gap-x-2 justify-center items-center rounded">
                        <ArrowLeftIcon className="w-4 h-4 text-white" />
                        <span>Back</span>
                    </button>
                </div>
                <h2 className={"text-lg dark:text-gray-300"}>
                    {!mediaState.show.data ? <Shimmer className={"w-60 h-[18px]"} /> : mediaState.show?.data?.album?.name}
                </h2>
            </div>

            <div className={"flex lg:flex-row flex-col md:px-10 sm:px-4 px-2 "}>



                <div className={"flex items-center relative justify-center md:h-[80vh] w-full"} style={{
                    //  backgroundColor: mediaState.show.data && getLighterColor(JSON.parse(mediaState.show.data.colors)[0]) 
                }}>
                    {!mediaState.show.data ? <Shimmer className={"w-full h-full"} /> :
                        <div className="w-max relative h-min">
                            <img
                                className={"object-contain  md:h-[80vh] w-full h-auto text-center p-2"}
                                src={mediaState.show.data && `${MEDIA_URL}${mediaState.show.data.watermark_path}`} />
                            <div className="flex z-10 absolute w-full h-full top-0 left-0 items-center justify-between px-4">
                                <ChevronLeftIcon onClick={() => goTo("prev")} className="sm:w-24 w-16 p-4 z-10 cursor-pointer" color="#fff" />
                                <ChevronRightIcon onClick={() => goTo("next")} className="sm:w-24 w-16 p-4 z-10 cursor-pointer" color="#fff" />
                            </div>
                        </div>

                    }

                </div>

                <div className={"lg:w-1/4 w-full md:px-10  mb-10 lg:mb-0"}>

                    {
                        1 === 1 &&
                        <div>
                            <div className={"font-proximaBold md:text-4xl text-3xl md:mt-0 mt-2 dark:text-gray-300"}>
                                {!mediaState.show.data ? <Shimmer className={"w-60 h-[40px] mt-8 mb-5 "} /> : '\u20AC' + mediaState.show.data.item_price.price}
                            </div>

                            {!mediaState.show.data ? <Shimmer className={"w-full py-4"} /> : <JavButton isLoading={downloading} onClick={onAddToCartClicked} className={"w-full mt-8 mb-5 bg-indigo-500 hover:bg-indigo-900 md:py-4 py-2 border border-indigo-800 rounded text-white"}>
                                {mediaState.show.data.item_price.price > 0 ? 'Add To Cart' : downloading ? 'Downloading...' : 'Download Now'}
                            </JavButton>}

                            <div className={"h-0.5 my-1 bg-gray-200"} />
                        </div>
                    }




                    {!mediaState.show.data ? <Shimmer className={"w-60 h-[20px] mt-4"} /> : <div className={"flex items-center mt-4"}>
                        <div className={"border-2 border-[#1e4570] dark:dark:border-gray-300  rounded-full"}>
                            <img className={"h-8 w-8 rounded-full object-contain"} src={"/logo-white.png"} />
                        </div>

                        <h2 className={"mx-2 font-proximaBold dark:dark:text-gray-300 "}>
                            UIPM Worldwide
                        </h2>

                    </div>}



                    {!mediaState.show.data ? <Shimmer className={"w-60 h-[20px] my-4"} /> : <div className={"my-4"}>
                        <h2 className="dark:dark:text-gray-300"> Description</h2>
                        <span className="dark:dark:text-gray-400">
                            {mediaState.show?.data?.album?.description}                  </span>
                    </div>}


                    {!mediaState.show.data ? <Shimmer className={"w-60 h-[20px] my-4"} /> :
                        <div className={"my-4"}>
                            <h2 className={"mb-2 dark:dark:text-gray-300"}>Tags</h2>
                            {
                                mediaState.show?.data?.tags?.split(",").map(item => {
                                    return (
                                        <span className={"mx-1 text-sm px-2 py-1 bg-gray-100  dark:dark:text-gray-400 border "}>
                                            {item}
                                        </span>
                                    )
                                })
                            }

                        </div>}

                    <div className={"mt-10"}>
                        {!mediaState.show.data ? <Shimmer className={"w-60 h-[20px] mt-4"} /> :
                            metaDetails && (
                                <>
                                    {metaDetails?.COMPUTER?.ApertureFNumber && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2 dark:dark:text-gray-300"}>Aperture:</div>
                                        <div className={"w-1/2 font-proximaBold dark:dark:text-gray-400"}>{metaDetails?.COMPUTER?.ApertureFNumber}</div>
                                    </div>}
                                    {metaDetails?.ShutterSpeedValue && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2 dark:dark:text-gray-300"}>Shutter Speed:</div>
                                        <div className={"w-1/2 font-proximaBold dark:dark:text-gray-400"}>{metaDetails?.ShutterSpeedValue}</div>
                                    </div>}
                                    {metaDetails?.FileSize && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2 dark:dark:text-gray-300"}>File Size:</div>
                                        <div className={"w-1/2 font-proximaBold dark:dark:text-gray-400"}>{metaDetails?.FileSize}</div>
                                    </div>}
                                    {metaDetails?.Make && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2 dark:dark:text-gray-300"}>Camera Name:</div>
                                        <div className={"w-1/2 font-proximaBold dark:dark:text-gray-400"}>{metaDetails?.Make}</div>
                                    </div>}
                                    {metaDetails?.Model && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2 dark:dark:text-gray-300"}>Camera Model:</div>
                                        <div className={"w-1/2 font-proximaBold dark:dark:text-gray-400"}>{metaDetails?.Model}</div>
                                    </div>}
                                    {metaDetails?.Software && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2 dark:dark:text-gray-300"}>Software:</div>
                                        <div className={"w-1/2 font-proximaBold dark:dark:text-gray-400"}>{metaDetails?.Software}</div>
                                    </div>}
                                    {metaDetails?.ResolutionUnit && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2 dark:dark:text-gray-300"}>Resolution:</div>
                                        <div className={"w-1/2 font-proximaBold dark:dark:text-gray-400"}>{metaDetails?.ResolutionUnit}</div>
                                    </div>}
                                    {metaDetails?.DateTimeOriginal && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2 dark:dark:text-gray-300"}>Original Date:</div>
                                        {/* TODO: */}
                                        <div className={"w-1/2 font-proximaBold dark:dark:text-gray-400"}>{metaDetails?.DateTimeOriginal}</div>
                                    </div>}
                                    {/*<a href="#" onClick={() => {*/}
                                    {/*    setMetaDialogOpen(true)*/}
                                    {/*}} className="text-blue-500 underline">For Nerds ...</a>*/}
                                </>

                            )
                        }






                    </div>



                </div>
            </div>

        </div>
    )
}