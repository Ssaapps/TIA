import LockIcon from "../../Shared/Component/Icons/LockIcon";
import EyeIcon from "../../Shared/Component/Icons/EyeIcon";
import CashIcon from "../../Shared/Component/Icons/CashIcon";
import BreadCrumb from "./Components/breadcrumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getHome } from "./duck/action";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../Cart/duck/action";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { MEDIA_URL } from "../../Shared/utils/constants";
import { convertToSentenceCase } from "../../Shared/Component/Chart/utilities";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';

export default function Welcome() {

    const categories = ["AI", "Viral", "Finance", "Lifestyle", "Accra", "Africa", "UIPM", "World Cup", "Mens Final", "Women's Final", "Horse Racing", "Marathon", "Swimming", "Budapest", "Entertainment"];
    const [selectedIndex, setSelectedIndex] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const homeState = useSelector((state) => state.home)
    const [hovered, setHovered] = useState(-1);


    const onAlbumAddToCartClicked = (album) => {
        dispatch(addItemToCart(album))
    }

    const onAlbumItemClicked = (album) => {
        navigate(`/album/${album.uuid}`)
    }

    const onMediaItemClicked = (media) => {
        navigate(`/photo/${media.id}`)
    }

    useEffect(() => {
        dispatch(getHome());
    }, [])


    return (
        <div className={""}>
            <div className="px-10 ">
                <Swiper
                    spaceBetween={30}
                    effect={'fade'}
                    // loop={true}
                    speed={1000}
                    autoplay={{
                        pauseOnMouseEnter: false,
                        delay: 2500,

                        disableOnInteraction: false, waitForTransition: true
                    }}
                    fadeEffect={{
                        crossFade: true

                    }}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, EffectFade, Navigation, Pagination]}
                    className="h-full px-auto swiper-button-white"
                >
                    {homeState.fetch?.data?.photos.map((item, index) => (
                        <SwiperSlide className="relative">
                            <img src={`${MEDIA_URL}${item.path}`} alt="Large image" className="w-full mx-auto" />
                            <div className="w-full h-full bg-black bg-opacity-50 z-20 absolute top-0 left-0" ></div>
                            <div className={"absolute bottom-5 md:bottom-10 lg:bottom-40 xl:bottom-80  md:right-20 left-5 lg:left-auto z-30"}>
                                <h2 className={"font-rubik md:text-xl text-lg text-white"}>Featured Editor Pick</h2>
                                <h1 className={"md:text-3xl text-xl font-proxima text-white"}>
                                    {homeState.fetch.data && homeState.fetch.data.albums.length > 0 && homeState.fetch.data.albums[0].name}
                                </h1>
                                <div className={"flex my-2 items-center"}>
                                    <div className={"border-2 border-white rounded-full"}>
                                        <img className={"md:h-12 md:w-12 h-8 w-8 object-contain rounded-full"} src={"/logo.png"} />
                                    </div>

                                    <h2 className={"mx-2 font-proximaBold text-white"}>
                                        UIPM Worldwide
                                    </h2>
                                </div>
                            </div>

                        </SwiperSlide>)
                    )}
                </Swiper>
            </div>

            <div className={"px-10 py-5"}>

                <h2 className={"font-rubik mb-4"}>
                    Newly Uploaded
                </h2>

                <div className={"grid gap-4 md:grid-cols-4 grid-cols-2"}>

                    {
                        homeState.fetch.data && homeState.fetch.data.albums.map((album) => {
                            return (
                                //TODO: add cart button and bind onpressed
                                <div className={"cursor-pointer group relative"} >
                                    <img
                                        className={"w-full rounded h-64 object-cover"}
                                        src={`${MEDIA_URL}${album.media[0].path}`}
                                    />
                                    <div className="flex w-full h-full items-center   justify-center absolute top-0 bg-opacity-20 bg-blue-800 opacity-0 group-hover:opacity-100 " nMouseOut={() => {
                                        setHovered(-1)
                                    }} onMouseOver={() => {
                                        setHovered(album.id)
                                    }}>
                                        <div className={`absolute   bottom-0 right-0 left-0 opacity-20 ${hovered === album.id ? 'bg-blue-800' : 'bg-black'}`} />

                                        <div className=" flex items-start gap-x-5" onClick={() => {
                                            onAlbumAddToCartClicked(album)
                                        }} aria-hidden="true">
                                            <div className="p-2 rounded-full hover:bg-gray-200 z-10">
                                                <EyeIcon onClick={() => onAlbumItemClicked(album)} className={"h-8 w-8 text-white  "} />
                                            </div>
                                            <div className="p-2 rounded-full hover:bg-gray-200 z-10">
                                                <ShoppingCartIcon onClick={() => { onAlbumAddToCartClicked(album) }} className={"h-8 w-8 text-white "} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="flex items-end p-4 opacity-0 group-hover:opacity-100" aria-hidden="true">
                                        <div className="w-full rounded-md bg-white bg-opacity-75 py-2 px-4 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter">
                                            View Album
                                        </div>
                                    </div> */}

                                    <div className={"absolute  bottom-0  left-0"}>
                                        {
                                            hovered === album.id &&
                                            <h3 className={" leading-none p-3 text-white text-sm font-proximaBold"}>
                                                {
                                                    album.name
                                                }
                                            </h3>
                                        }
                                    </div>

                                    {/*<h3 className={"w-3/4 leading-none p-1 text-lg"}>*/}
                                    {/*    {*/}
                                    {/*        album.name*/}
                                    {/*    }*/}
                                    {/*</h3>*/}


                                    {/*<div className={"flex items-center"}>*/}
                                    {/*    <div className={"border-2 border-[#1e4570] rounded-full"}>*/}
                                    {/*        <img className={"h-8 w-8 rounded-full object-contain"} src={"/logo.png"}/>*/}
                                    {/*    </div>*/}

                                    {/*    <h2 className={"mx-2 font-proximaBold"}>*/}
                                    {/*        UIMP Worldwide*/}
                                    {/*    </h2>*/}

                                    {/*    <div className={"flex ml-4 items-center"}>*/}
                                    {/*        <EyeIcon/>*/}
                                    {/*        <span>2k</span>*/}
                                    {/*    </div>*/}

                                    {/*    <div className={"flex mx-2 items-center"}>*/}
                                    {/*        <CashIcon/>*/}
                                    {/*        <span>2k</span>*/}
                                    {/*    </div>*/}

                                    {/*</div>*/}



                                </div>
                            )
                        })
                    }



                </div>

            </div>


            <div className={"flex mt-5 pb-10 px-10"}>

                <div className={"w-1/6 h-72 sticky top-0 flex flex-col"}>


                    {
                        homeState.fetch.data?.tags.map((item, index) => {
                            return (
                                <div onClick={() => setSelectedIndex(index)} className={"my-2 flex items-center justify-start"}>
                                    <div className={` ${selectedIndex === index ? 'bg-gray-700 text-white' : 'bg-gray-200'} border px-5 py-1.5 rounded-full cursor-pointer text-sm font-proximaBold`}>
                                        {convertToSentenceCase(item)}
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>

                <div className={"w-5/6"}>
                    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        {
                            homeState.fetch.data && homeState.fetch.data.photos.map((item, index) => {
                                return (
                                    <div onClick={() => onMediaItemClicked(item)} className={` ${index % 3 === 0 ? 'row-span-2 ' : ''}relative border min-h-fit min-w-fit cursor-pointer group relative `}>

                                        <img className={`${index % 3 === 0 ? 'h-full' : 'h-72'} object-cover w-full rounded`}
                                            src={`${MEDIA_URL}${item.path}`} alt="Large image" />
                                        <div className={"absolute "}>
                                            {/*{index % 3}*/}
                                        </div>

                                    </div>
                                )
                            })
                        }


                    </div>

                </div>

            </div>

        </div>
    )
}