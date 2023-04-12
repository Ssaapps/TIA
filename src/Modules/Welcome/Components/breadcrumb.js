import LockIcon from "../../../Shared/Component/Icons/LockIcon";
import EyeIcon from "../../../Shared/Component/Icons/EyeIcon";
import CashIcon from "../../../Shared/Component/Icons/CashIcon";
import {useEffect, useState} from "react";

export default function BreadCrumb() {

    const images = [
        'https://images.unsplash.com/photo-1674574124475-16dd78234342?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        'https://images.unsplash.com/photo-1674574124976-a56d9052c2f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
        'https://images.unsplash.com/photo-1674574124345-02c525664b65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage((currentImage + 1) % images.length);
        }, 2000);

        return () => clearInterval(intervalId);
    }, [currentImage]);




    return (
        <div style={{height: '600px'}} className={"bg-gray-200 flex flex-row items-center px-12"}>
            <img
                src={images[currentImage]}
                className={"h-5/6 w-3/5 object-cover transition-transform duration-500 ease-in-out rounded"}
            />
            <div className={"px-20"}>
                <h2 className={"font-rubik text-xl text-gray-900"}>Featured Editor Pick</h2>
                <h1 className={"text-3xl font-proxima"}>
                    New Picks: Susan G. Komen 3-Day program
                </h1>
                <div className={"flex my-2 items-center"}>
                    <div className={"border-2 border-[#1e4570] rounded-full"}>
                        <img className={"h-12 w-12 object-contain rounded-full"} src={"/logo.png"}/>
                    </div>

                    <h2 className={"mx-2 font-proximaBold"}>
                        UIPM Worldwide
                    </h2>
                </div>

                <div className={"flex my-2"}>


                    <div className={"flex items-center"}>
                        <LockIcon className={"h-4"}/>
                        <div className={"h-2 relative rounded w-44 bg-gray-500"}>
                            <div className={"absolute h-2 outline-none rounded-full bg-black top-0 left-0 w-1/2"}></div>
                        </div>
                        <LockIcon className={"h-4"}/>

                    </div>


                    <div className={"flex ml-44 items-center"}>
                        <EyeIcon/>
                        <span>2k</span>
                    </div>

                    <div className={"flex mx-6 items-center"}>
                        <CashIcon/>
                        <span>2k</span>
                    </div>



                </div>
            </div>
        </div>

    )
}