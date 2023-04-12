import LockIcon from "../../Shared/Component/Icons/LockIcon";
import EyeIcon from "../../Shared/Component/Icons/EyeIcon";
import CashIcon from "../../Shared/Component/Icons/CashIcon";
import BreadCrumb from "./Components/breadcrumb";
import {useState} from "react";
import {useNavigate} from "react-router";

export default function Welcome() {

    const categories = ["AI","Viral","Finance","Lifestyle","Accra","Africa","Entertainment"];
    const [selectedIndex,setSelectedIndex] = useState(0);
    const images = [
        "https://unsplash.com/photos/B-KNSrFgmA0/download?ixid=MnwxMjA3fDB8MXxhbGx8M3x8fHx8fDJ8fDE2ODEzMjc4NTM&force=true",
        "https://images.unsplash.com/photo-1674574124567-79b2ee3d22fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
        "https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
        "https://images.unsplash.com/photo-1681276311947-ebee32b4d4cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
        "https://images.unsplash.com/photo-1679613753438-125c62c94b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
        "https://images.unsplash.com/photo-1679652557788-a6add7fcd992?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        "https://images.unsplash.com/photo-1681066471074-d45c49154f44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80",
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80",
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80",
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80",
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80",
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80",
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80",
    ];
    const navigate = useNavigate();


    const onItemClick = () => {
        navigate(`/photo/123213`)
    }


    return (
        <div className={""}>

            <BreadCrumb/>

            <div className={"px-10 py-5"}>

                <h2 className={"font-rubik mb-4"}>
                    Newly Uploaded
                </h2>

                <div className={"grid gap-4 grid-cols-4"}>

                    {
                        [images[0],images[1],images[5],images[6]].map((item) => {
                            return (
                                <div className={"cursor-pointer"} onClick={onItemClick}>
                                    <img
                                        className={"w-full rounded h-64 object-cover"}
                                        src={item}
                                    />
                                    <h3 className={"w-3/4 leading-none p-1 text-lg"}>
                                        Boredom of a lady is the businesses of a running car
                                    </h3>


                                    <div className={"flex items-center"}>
                                        <div className={"border-2 border-[#1e4570] rounded-full"}>
                                            <img className={"h-8 w-8 rounded-full object-contain"} src={"/logo.png"}/>
                                        </div>

                                        <h2 className={"mx-2 font-proximaBold"}>
                                            UIMP Worldwide
                                        </h2>

                                        <div className={"flex ml-4 items-center"}>
                                            <EyeIcon/>
                                            <span>2k</span>
                                        </div>

                                        <div className={"flex mx-2 items-center"}>
                                            <CashIcon/>
                                            <span>2k</span>
                                        </div>

                                    </div>



                                </div>
                            )
                        })
                    }



                </div>

            </div>


            <div className={"flex mt-5 pb-10 px-10"}>

                <div className={"w-1/6 h-72 sticky top-0 flex flex-col"}>


                    {
                        categories.map((item,index) => {
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
                            images.map((item,index) => {
                                return (
                                    <div className={` ${index % 3=== 0 ? 'row-span-2' : ''} cursor-pointer`}>
                                        <img className={`${index % 3=== 0 ? 'h-144' : 'h-72'} object-cover w-full rounded`}
                                             src={item} alt="Large image"/>
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