import LockIcon from "../../../Shared/Component/Icons/LockIcon";
import EyeIcon from "../../../Shared/Component/Icons/EyeIcon";
import CashIcon from "../../../Shared/Component/Icons/CashIcon";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {MEDIA_URL} from "../../../Shared/utils/constants";

export default function BreadCrumb(props) {

    const homeState = useSelector((state) => state.home)

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        if (homeState.fetch.data && homeState.fetch.data.albums.length > 0) {
            const intervalId = setInterval(() => {
                setCurrentImage((currentImage + 1) % homeState.fetch.data.albums[0].media.length);
            }, 2000);
            return () => clearInterval(intervalId);
        }
    }, [currentImage]);


    useEffect(() => {
        if (homeState.fetch.data) {
            console.log("album", homeState.fetch.data.albums[0])
        }
    }, [homeState]);



    return (
        <div style={{ height: '600px' }} className={"bg-gray-200 flex flex-row items-center px-12"}>
            <img
                src={homeState.fetch.data && `${MEDIA_URL}${homeState.fetch.data.albums[0].media[currentImage].path}`}
                className={"h-5/6 w-3/5 object-cover transition-transform duration-500 ease-in-out rounded"}
            />
            <div className={"px-20"}>
                <h2 className={"font-rubik text-xl text-gray-900"}>Featured Editor Pick</h2>
                <h1 className={"text-3xl font-proxima"}>
                    {homeState.fetch.data && homeState.fetch.data.albums[0].name}
                </h1>
                <div className={"flex my-2 items-center"}>
                    <div className={"border-2 border-[#1e4570] rounded-full"}>
                        <img className={"h-12 w-12 object-contain rounded-full"} src={"/logo.png"} />
                    </div>

                    <h2 className={"mx-2 font-proximaBold"}>
                        UIPM Worldwide
                    </h2>
                </div>

                {/*<div className={"flex my-2"}>*/}


                {/*    <div className={"flex items-center"}>*/}
                {/*        <LockIcon className={"h-4"} />*/}
                {/*        <div className={"h-2 relative rounded w-44 bg-gray-500"}>*/}
                {/*            <div className={"absolute h-2 outline-none rounded-full bg-black top-0 left-0 w-1/2"}></div>*/}
                {/*        </div>*/}
                {/*        <LockIcon className={"h-4"} />*/}

                {/*    </div>*/}


                {/*    <div className={"flex ml-44 items-center"}>*/}
                {/*        <EyeIcon />*/}
                {/*        <span>2k</span>*/}
                {/*    </div>*/}

                {/*    <div className={"flex mx-6 items-center"}>*/}
                {/*        <CashIcon />*/}
                {/*        <span>2k</span>*/}
                {/*    </div>*/}



                {/*</div>*/}
            </div>
        </div>

    )
}