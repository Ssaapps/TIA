import LockIcon from "../../Shared/Component/Icons/LockIcon";
import EyeIcon from "../../Shared/Component/Icons/EyeIcon";
import CashIcon from "../../Shared/Component/Icons/CashIcon";
import BreadCrumb from "./Components/breadcrumb";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getHome } from "./duck/action";
import { useDispatch, useSelector } from "react-redux";

export default function Welcome() {

    const categories = ["AI", "Viral", "Finance", "Lifestyle", "Accra", "Africa", "UIPM", "World Cup", "Mens Final", "Women's Final", "Horse Racing", "Marathon", "Swimming", "Budapest", "Entertainment"];
    const [selectedIndex, setSelectedIndex] = useState(0);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const homeState = useSelector((state) => state.home)
    const [hovered, setHovered] = useState(-1);


    const onAlbumAddToCartClicked = (album) => {
        var tempCartItems = [];
        const cartItems = JSON.parse(localStorage.getItem("cart"));
        if (cartItems) {
            tempCartItems = cartItems;
        }
        tempCartItems = [...tempCartItems, album];
        localStorage.setItem("cart", JSON.stringify(tempCartItems));
    }

    const onAlbumItemClicked = (album) => {
        navigate(`/album/${album.id}`)
    }

    const onMediaItemClicked = (media) => {
        navigate(`/photo/${media.id}`)
    }

    useEffect(() => {
        dispatch(getHome());
    }, [])


    return (
        <div className={""}>

            <BreadCrumb album={homeState.fetch.data && homeState.fetch.data.albums[0]} />

            <div className={"px-10 py-5"}>

                <h2 className={"font-rubik mb-4"}>
                    Newly Uploaded
                </h2>

                <div className={"grid gap-4 grid-cols-4"}>

                    {
                        homeState.fetch.data && homeState.fetch.data.albums.map((album) => {
                            return (
                                //TODO: add cart button and bind onpressed
                                <div className={"cursor-pointer relative"} onClick={() => onAlbumItemClicked(album)}>
                                    <img
                                        className={"w-full rounded h-64 object-cover"}
                                        src={`http://localhost:8000${album.media[0].path}`}
                                    />
                                    <div className={`absolute top-0 bottom-0 right-0 left-0 opacity-20 ${hovered === album.id ? 'bg-blue-800' : 'bg-black'}`} />

                                    <div className={"absolute top-0 bottom-0 right-0 left-0"} onMouseOut={() => {
                                        setHovered(-1)
                                    }} onMouseOver={() => {
                                        setHovered(album.id)
                                    }}>
                                        <div className={"flex h-full items-end justify-start"}>
                                            {
                                                hovered === album.id &&
                                                <h3 className={"w-3/4 leading-none p-3 text-white text-sm font-proximaBold"}>
                                                    {
                                                        album.name
                                                    }
                                                </h3>
                                            }
                                        </div>
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
                        categories.map((item, index) => {
                            return (
                                <div onClick={() => setSelectedIndex(index)} className={"my-2 flex items-center justify-start"}>
                                    <div className={` ${selectedIndex === index ? 'bg-gray-700 text-white' : 'bg-gray-200'} border px-5 py-1.5 rounded-full cursor-pointer text-sm font-proximaBold`}>
                                        {item}
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>

                <div className={"w-5/6"}>
                    <div className="grid grid-cols-3 gap-4">
                        {
                            homeState.fetch.data && homeState.fetch.data.photos.map((item, index) => {
                                return (
                                    <div onClick={() => onMediaItemClicked(item)} className={` ${index % 3 === 0 ? 'row-span-2' : ''} cursor-pointer`}>

                                        <img className={`${index % 3 === 0 ? 'h-144' : 'h-72'} object-cover w-full rounded`}
                                            src={`http://localhost:8000${item.path}`} alt="Large image" />

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