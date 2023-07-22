import EyeIcon from "../../Shared/Component/Icons/EyeIcon";
import CashIcon from "../../Shared/Component/Icons/CashIcon";
import ClockIcon from "../../Shared/Component/Icons/ClockIcon";
import CameraIcon from "../../Shared/Component/Icons/CameraIcon";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAlbum } from "../Admin/albums/duck/action";
import { getMedia, getMediaDetails } from "../Admin/photos/duck/action";
import { flattenObject, getLighterColor } from "../../Shared/utils/common";
import { purchaseMedia } from "./duck/action";
import { MEDIA_URL } from "../../Shared/utils/constants";
import { addItemToCart } from "../Cart/duck/action";
import SuccessAlert from "../../Shared/Component/Alert/Success";
import Shimmer from "../../Shared/Component/Suspense/Shimmer";
import MetaDisplayDialog from "./MetaDisplayDialog";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Photo() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const mediaState = useSelector((state) => state.media)
    const photoDetailState = useSelector((state) => state.photo_detail)
    const [metaDetails, setMetaDetails] = useState(null)
    const [itemAddedMessage, setItemAddedMessage] = useState(null)
    const [metaDialogOpen, setMetaDialogOpen] = useState(false)
    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }

    useEffect(() => {
        dispatch(getMediaDetails(params.id))
    }, [])

    useEffect(() => {
        if (mediaState.show.data?.meta) {
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
        dispatch(addItemToCart(mediaState.show.data, (itemAlreadyInCart) => {
            let message = itemAlreadyInCart ? "Item already in cart" : "Item Added to cart"
            setItemAddedMessage(message)

        }))
    }
    // useEffect(() => {
    //     if (itemAdded) {
    //         setTimeout(() => {
    //             setItemAdded(false)
    //         }, [3000])
    //     }
    // }, [itemAdded])

    return (
        <div>
            {mediaState.show.data && <MetaDisplayDialog open={metaDialogOpen} setOpen={setMetaDialogOpen} metaObj={flattenObject(JSON.parse(mediaState.show.data.meta))} />}
            <SuccessAlert open={!!itemAddedMessage} message={itemAddedMessage} onClose={() => {
                setItemAddedMessage(null)
            }} />
            <div className={"px-10 mt-10 mb-5 gap-x-5 flex items-center"}>
                {/* <span className={"px-2 mr-2 text-sm  bg-gray-100 rounded border"}>
                    new
                </span> */}
                <div className="flex items-center justify-center">
                    <button onClick={() => {
                        navigate(-1)
                    }} className="bg-[#1e4570] hover:bg-blue-700 text-white font-medium text-xs py-2 px-4 flex gap-x-2 justify-center items-center rounded">
                        <ArrowLeftIcon className="w-4 h-4 text-white" />
                        <span>Back</span>
                    </button>
                </div>
                <h2 className={"text-lg"}>
                    {!mediaState.show.data ? <Shimmer className={"w-60 h-[18px]"} /> : mediaState.show?.data?.album?.name}
                </h2>
            </div>

            <div className={"flex lg:flex-row flex-col md:px-10 sm:px-4 px-2 "}>



                <div className={"flex items-center justify-center md:h-[80vh] w-full"} style={{
                    //  backgroundColor: mediaState.show.data && getLighterColor(JSON.parse(mediaState.show.data.colors)[0]) 
                }}>
                    {!mediaState.show.data ? <Shimmer className={"w-full h-full"} /> :

                        <img
                            className={"object-contain  md:h-[80vh] w-full h-auto text-center p-2"}
                            src={mediaState.show.data && `${MEDIA_URL}${mediaState.show.data.path}`} />
                    }
                </div>

                <div className={"lg:w-1/4 w-full md:px-10  mb-10 lg:mb-0"}>

                    {
                        1 === 1 &&
                        <div>
                            <div className={"font-proximaBold md:text-4xl text-3xl md:mt-0 mt-2"}>
                                {!mediaState.show.data ? <Shimmer className={"w-60 h-[40px] mt-8 mb-5"} /> : '\u20AC' + mediaState.show.data.item_price.price}
                            </div>

                            {!mediaState.show.data ? <Shimmer className={"w-full py-4"} /> : <button onClick={onAddToCartClicked} className={"w-full mt-8 mb-5 bg-indigo-500 hover:bg-indigo-900 md:py-4 py-2 border border-indigo-800 rounded text-white"}>
                                Add To Cart
                            </button>}

                            <div className={"h-0.5 my-1 bg-gray-200"} />
                        </div>
                    }




                    {!mediaState.show.data ? <Shimmer className={"w-60 h-[20px] mt-4"} /> : <div className={"flex items-center mt-4"}>
                        <div className={"border-2 border-[#1e4570] rounded-full"}>
                            <img className={"h-8 w-8 rounded-full object-contain"} src={"/logo.png"} />
                        </div>

                        <h2 className={"mx-2 font-proximaBold"}>
                            UIPM Worldwide
                        </h2>

                    </div>}



                    {!mediaState.show.data ? <Shimmer className={"w-60 h-[20px] my-4"} /> : <div className={"my-4"}>
                        <h2>Description</h2>
                        <span>
                            {mediaState.show?.data?.album?.description}                  </span>
                    </div>}


                    {!mediaState.show.data ? <Shimmer className={"w-60 h-[20px] my-4"} /> :
                        <div className={"my-4"}>
                            <h2 className={"mb-2"}>Tags</h2>
                            {
                                mediaState.show?.data?.tags?.split(",").map(item => {
                                    return (
                                        <span className={"mx-1 text-sm px-2 py-1 bg-gray-100 border "}>
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
                                        <div className={"w-1/2"}>Aperture:</div>
                                        <div className={"w-1/2 font-proximaBold"}>{metaDetails?.COMPUTER?.ApertureFNumber}</div>
                                    </div>}
                                    {metaDetails?.ShutterSpeedValue && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2"}>Shutter Speed:</div>
                                        <div className={"w-1/2 font-proximaBold"}>{metaDetails?.ShutterSpeedValue}</div>
                                    </div>}
                                    {metaDetails?.FileSize && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2"}>File Size:</div>
                                        <div className={"w-1/2 font-proximaBold"}>{metaDetails?.FileSize}</div>
                                    </div>}
                                    {metaDetails?.Make && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2"}>Camera Name:</div>
                                        <div className={"w-1/2 font-proximaBold"}>{metaDetails?.Make}</div>
                                    </div>}
                                    {metaDetails?.Model && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2"}>Camera Model:</div>
                                        <div className={"w-1/2 font-proximaBold"}>{metaDetails?.Model}</div>
                                    </div>}
                                    {metaDetails?.Software && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2"}>Software:</div>
                                        <div className={"w-1/2 font-proximaBold"}>{metaDetails?.Software}</div>
                                    </div>}
                                    {metaDetails?.ResolutionUnit && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2"}>Resolution:</div>
                                        <div className={"w-1/2 font-proximaBold"}>{metaDetails?.ResolutionUnit}</div>
                                    </div>}
                                    {metaDetails?.DateTimeOriginal && <div className={"flex my-2 items-center"} >
                                        <div className={"w-1/2"}>Original Date:</div>
                                        {/* TODO: */}
                                        <div className={"w-1/2 font-proximaBold"}>{metaDetails?.DateTimeOriginal}</div>
                                    </div>}
                                    <a href="#" onClick={() => {
                                        setMetaDialogOpen(true)
                                    }} className="text-blue-500 underline">For Nerds ...</a>
                                </>

                            )
                        }






                    </div>



                </div>
            </div>

        </div>
    )
}