import EyeIcon from "../../Shared/Component/Icons/EyeIcon";
import CashIcon from "../../Shared/Component/Icons/CashIcon";
import ClockIcon from "../../Shared/Component/Icons/ClockIcon";
import CameraIcon from "../../Shared/Component/Icons/CameraIcon";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAlbum} from "../Admin/albums/duck/action";
import {getMedia, getMediaDetails} from "../Admin/photos/duck/action";
import {getLighterColor} from "../../Shared/utils/common";

export default function Photo() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const mediaState = useSelector( (state) => state.media)


    useEffect(() => {
        dispatch(getMediaDetails(params.id))
    },[])

    useEffect(() => {
        console.log("mediaState",mediaState)
    },[mediaState])

    const onPaymentClicked = () => {
        window.open('https://payment-web.simu.sips-services.com/en/payment/selectpaymentmethod/ppc0', '_blank', 'noreferrer');
    };

    return (
        <div>

            <div className={"px-10 mt-10 mb-5 flex items-center"}>
                <span className={"px-2 mr-2 text-sm  bg-gray-100 rounded border"}>
                    new
                </span>
                <h2 className={"text-lg"}>
                    Woman at Home Decor Store stock photo
                </h2>
            </div>

            <div className={"flex px-10"}>


                <div className={"w-3/4 bg-white h-full border"}>


                    <div className={"flex items-center justify-center"} style={{height: '80vh',backgroundColor: mediaState.show.data && getLighterColor(JSON.parse(mediaState.show.data.colors)[0])}}>

                        <img
                            className={"object-contain h-full text-center p-2"}
                            src={mediaState.show.data && `http://localhost:8000${mediaState.show.data.path}`}/>

                    </div>

                    <div className={""}>

                    </div>
                </div>

                <div className={"w-1/4 px-10"}>

                    <div className={"font-proximaBold text-4xl"}>
                        $10.00
                    </div>

                    <button className={"w-full mt-8 mb-5 bg-indigo-500 hover:bg-indigo-900 py-4 border border-indigo-800 rounded text-white"}>
                        Continue to Purchase
                    </button>

                    <div className={"h-0.5 my-1 bg-gray-200"}/>



                    <div className={"flex items-center mt-4"}>
                        <div className={"border-2 border-[#1e4570] rounded-full"}>
                            <img className={"h-8 w-8 rounded-full object-contain"} src={"/logo.png"}/>
                        </div>

                        <h2 className={"mx-2 font-proximaBold"}>
                            UIMP Worldwide
                        </h2>

                    </div>

                    <div className={"my-4"}>
                        <h2>Description</h2>
                        <span>
                            Woman shopping at home decor store
                        </span>
                    </div>


                    <div className={"my-4"}>
                        <h2 className={"mb-2"}>Tags</h2>
                        {
                            [0,0,0,0].map(item => {
                                return (
                                    <span className={"mx-1 text-sm px-2 py-1 bg-gray-100 border "}>
                                        Food
                                    </span>
                                )
                            })
                        }

                    </div>

                    <div className={"mt-10"}>
                        <div className={"flex my-2 items-center"}>
                            <div className={"w-1/2"}> Largest size: </div>
                            <div className={"w-1/2 font-proximaBold"}> 8192 x 5464 px  </div>
                        </div>

                        <div className={"flex my-2 items-center"}>
                            <div className={"w-1/2"}> Uploaded At: </div>
                            <div className={"w-1/2 font-proximaBold"}> 8192 x 5464 px  </div>
                        </div>

                        <div className={"flex my-2 items-center"}>
                            <div className={"w-1/2"}> Camera : </div>
                            <div className={"w-1/2 font-proximaBold"}> 8192 x 5464 px  </div>
                        </div>

                        <div className={"flex my-2 items-center"}>
                            <div className={"w-1/2"}> Aperture: </div>
                            <div className={"w-1/2 font-proximaBold"}> 8192 x 5464 px  </div>
                        </div>

                        <div className={"flex my-2 items-center"}>
                            <div className={"w-1/2"}> Focal Lenth : </div>
                            <div className={"w-1/2 font-proximaBold"}> 8192 x 5464 px  </div>
                        </div>

                        <div className={"flex my-2 items-center"}>
                            <div className={"w-1/2"}> Exposure Time : </div>
                            <div className={"w-1/2 font-proximaBold"}> 8192 x 5464 px  </div>
                        </div>

                        <div className={"flex my-2 items-center"}>
                            <div className={"w-1/2"}> ISO : </div>
                            <div className={"w-1/2 font-proximaBold"}> 8192 x 5464 px  </div>
                        </div>

                        <div className={"flex my-2 items-center"}>
                            <div className={"w-1/2"}> Flash : </div>
                            <div className={"w-1/2 font-proximaBold"}> 8192 x 5464 px  </div>
                        </div>




                    </div>



                </div>
            </div>

        </div>
    )
}