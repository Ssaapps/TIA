import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getAlbum, getAlbums, shareAlbum } from "../Admin/albums/duck/action";
import { useDispatch, useSelector } from "react-redux";
import { MEDIA_URL } from "../../Shared/utils/constants";
import { EyeIcon, ShareIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import CartIcon from "../../Shared/Component/Icons/CartIcon";
import { addItemToCart } from "../Cart/duck/action";
import Shimmer from "../../Shared/Component/Suspense/Shimmer";

export default function Album() {

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const albumState = useSelector((state) => state.albums)
    const [hovered, setHovered] = useState(-1);
    const [cartButtonHovered, setCartButtonHovered] = useState(false)
    useEffect(() => {
        dispatch(getAlbum(params.id))
    }, [])

    useEffect(() => {
        console.log("albumState", albumState)
    }, [albumState])
    const onMediaClick = (media) => {
        navigate(`/photo/${media.id}`)
    }
    const onMediaAddToCartClick = (media) => {
        dispatch(addItemToCart(media))
    }

    function share() {
        if (navigator.share) {
            navigator.share({
                title: 'Album share',
                url: document.URL,
                text: `Check out this album ${albumState.show.data && albumState.show.data.name} on TIA`
            }).then(() => {
                dispatch(shareAlbum(albumState.show.data.id))
            }).catch(err => {
                // Handle errors, if occured
            });
        } else {
            // Alerts user if API not available 
            alert("Browser doesn't support this API !");
        }
    }

    return (
        <div className="overflow-y-auto relative">


            {/* <div className="fixed top-20 z-50 flex flex-col gap-y-4 right-10">
                <div className="flex items-center cursor-pointer hover:bg-gray-100 justify-center h-9 w-9 overflow-hidden rounded-full bg-white shadow">
                    <ShareIcon className="w-5 h-5" onClick={async () => {

                    }} />
                </div>
                <div className="flex items-center cursor-pointer hover:bg-gray-100 justify-center h-9 w-9 overflow-hidden rounded-full bg-white shadow">
                    <CartIcon className="w-5 h-5" onClick={() => {
                        dispatch(addItemToCart(albumState.show.data))
                    }} />
                </div>
            </div> */}


            <div style={{ height: '50vh' }} className={"bg-red-200 relative overflow-y-auto"}>
                {!albumState.show.data ? <Shimmer className={"w-full h-[50vh]"} /> :
                    <img
                        className={"object-cover w-full h-full"}
                        src={albumState.show.data && `${MEDIA_URL}${albumState.show.data.media[0].path}`}
                    />}
                <div className={"absolute top-0 right-0 bg-black bottom-0 left-0 opacity-50"} />
                <div className={"absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center"}>
                    <div className={"text-center flex flex-col justify-center items-center  text-white"}>
                        <h2 className={"text-4xl font-proximaBold"}>{albumState.show.data && albumState.show.data.name}</h2>
                        <h2 className={"text-2xl font-normal"}>{albumState.show.data && albumState.show.data.description}</h2>
                        <div className={"flex my-2"}>
                            <div>{albumState.show.data && albumState.show.data.views + ` view${albumState.show.data.views > 1 ? "s" : ""}`} </div>
                            <div className={"mx-2"}>{albumState.show.data && albumState.show.data.shares + ` share${albumState.show.data.shares > 1 ? "s" : ""}`} </div>
                            <div className={"mx-2"}>{albumState.show.data && albumState.show.data.media_count + ` photo${albumState.show.data.media_count > 1 ? "s" : ""}`}</div>

                        </div>
                    </div>
                </div>

            </div>


            <div className={"grid grid-cols-3 gap-4 m-10"}>

                {
                    !albumState.show.data ? [0, 0, 0].map(item => <Shimmer className={"w-full h-[500px]"} />) : albumState.show.data.media.map((media, index) => {
                        return (
                            <div
                                key={index}
                                // onClick={() => {
                                //     onMediaClick(media)
                                // }}
                                className={`relative group bg-gray-200 cursor-pointer  ${(index + 1) % 3 === 0 ? 'col-span-2' : ''} `}
                                style={
                                    {
                                        backgroundImage: `url(${MEDIA_URL}${media.path})`,
                                        backgroundSize: 'scale-down',
                                        backgroundPosition: "center",
                                        height: (index + 1) % 6 === 4 ? '1000px' : '500px',
                                        marginTop: (index + 1) % 6 === 4 ? '-500px' : ''
                                    }
                                }
                            >

                                <div className={"absolute top-0 left-0 right-0 cursor-pointer bottom-0 bg-black opacity-10"} />
                                <div onClick={() => {
                                    if (!cartButtonHovered) {
                                        onMediaClick(media)
                                    }
                                }} className="flex w-full h-full items-center   justify-center absolute top-0 bg-opacity-20 bg-blue-800 opacity-0 group-hover:opacity-100 " nMouseOut={() => {
                                    setHovered(-1)
                                }} onMouseOver={() => {
                                    setHovered(media.id)
                                }}>
                                    <div className={`absolute   bottom-0 right-0 left-0 opacity-20 ${hovered === media.id ? 'bg-blue-800' : 'bg-black'}`} />

                                    {/* <div className=" flex items-start gap-x-5"
                                        aria-hidden="true">
                                        <div className="p-2 rounded-full hover:bg-gray-200 z-10">
                                            <EyeIcon onClick={() => onMediaClick(media)} className={"h-8 w-8 text-white  "} />
                                        </div>
                                        <div className="p-2 rounded-full hover:bg-gray-200 z-10">
                                            <ShoppingCartIcon onMouseOver={() => {
                                                setCartButtonHovered(true)
                                            }} onMouseOut={() => {
                                                setCartButtonHovered(false)
                                            }} onClick={() => { onMediaAddToCartClick(media) }} className={"h-8 w-8 text-white "} />
                                        </div>
                                    </div> */}
                                </div>
                            </div>


                        )
                    })
                }


            </div>

        </div>
    )
}