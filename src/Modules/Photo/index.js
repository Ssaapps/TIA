import EyeIcon from "../../Shared/Component/Icons/EyeIcon";
import CashIcon from "../../Shared/Component/Icons/CashIcon";
import ClockIcon from "../../Shared/Component/Icons/ClockIcon";
import CameraIcon from "../../Shared/Component/Icons/CameraIcon";
import {useNavigate} from "react-router";

export default function Photo() {

    const navigate = useNavigate();

    const onPaymentClicked = () => {
        window.open('https://payment-web.simu.sips-services.com/en/payment/selectpaymentmethod/ppc0', '_blank', 'noreferrer');
    };

    return (
        <div>


            <div style={{height: '75vh'}} className={"relative bg-green-200"}>

                <img
                    className={"w-full bg-gray-700 px-16 pb-20 pt-5 rounded h-full object-cover"}
                    src={"https://images.unsplash.com/photo-1679613753438-125c62c94b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"}/>

                <div className={"absolute h-12 flex justify-center items-center  left-0 right-0 rounded  bottom-5 "}>
                    {
                        [0,0,0,0].map(item => {
                            return (
                                <div className={"h-5 w-5 border border-2 border-gray-300 mx-1"}>
                                    <img
                                        className={"object-cover cursor-pointer w-full h-full"}
                                        src={"https://images.unsplash.com/photo-1679613753438-125c62c94b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"}/>

                                </div>
                            )
                        })
                    }
                </div>

            </div>

            <div className={"flex justify-between px-16 my-10"}>

                <div className={"flex"}>

                    <img src={"/logo.png"}
                         className={"h-20 object-contain border-2 border-indigo-900 w-20 rounded-full"}
                    />

                    <div className={"flex mx-5 flex-col"}>

                        <h2 className={"font-rubik"}>UIPM World Presentation</h2>
                        <h5 className={"font-proxima"}>UIPM 2022 Bianthie-Traingle World Champoinships</h5>
                        <span className={"text-sm font-proxima"}>
                            Day 1 - Mixed Relay
                        </span>


                    </div>

                </div>

                <div className={"flex text-sm font-proxima"}>

                    <div className={"flex mx-2 items-center"}>
                        <EyeIcon/>
                        <span>2k</span>
                    </div>

                    <div className={"flex mx-2 items-center"}>
                        <CashIcon/>
                        <span>2k</span>
                    </div>

                    <div className={"flex mx-2 items-center"}>
                        <ClockIcon/>
                        <span>2nd May 2022</span>
                    </div>


                </div>




            </div>


            <div className={"px-16 py-5 border-t border-2"}>

                <div className={"flex"}>

                    <div className={"flex w-1/2"}>

                        <CameraIcon className={"h-32 w-32 stroke-gray-400"}/>

                        <div className={"flex leading-none mx-10 flex-col"}>
                            <h2 className={"text-blue-800 font-proximaBold cursor-pointer mt-6 "}>Cannon EOS R5</h2>
                            <h2 className={"my-0.5 mt-2 text-sm"}>Cannon EOS R5</h2>
                            <h2 className={"text-sm"}>f/2.8L II USM</h2>
                        </div>

                        <div className={"grid grid-cols-3 text-sm font-proxima gap-x-8 gap-y-0"}>

                            <div className={"flex mx-2 items-center"}>
                                <CameraIcon className={"h-10 mx-1 w-10 stroke-1"}/>
                                <span>2k</span>
                            </div>

                            <div className={"flex mx-2 items-center"}>
                                <ClockIcon className={"h-10 w-10 stroke-1"}/>
                                <span>2k</span>
                            </div>

                            <div className={"flex mx-2 items-center"}>
                                <CameraIcon className={"h-10 mx-1 w-10 stroke-1"}/>
                                <span>2k</span>
                            </div>

                            <div className={"flex mx-2 items-center"}>
                                <ClockIcon className={"h-10 w-10 stroke-1"}/>
                                <span>2k</span>
                            </div>

                            <div className={"flex mx-2 items-center"}>
                                <CameraIcon className={"h-10 mx-1 w-10 stroke-1"}/>
                                <span>2k</span>
                            </div>

                            <div className={"flex mx-2 items-center"}>
                                <ClockIcon className={"h-10 w-10 stroke-1"}/>
                                <span>2k</span>
                            </div>



                        </div>


                    </div>




                    <div className={"w-1/2 flex flex-col"}>

                        <h3 className={"font-proximaBold"}>Purchase without watermark(Personal License)</h3>
                        <div className={"items-center font-proxima gap-1 text-sm grid grid-cols-3"}>

                            <div className={"flex h-10 items-center"} onClick={onPaymentClicked}>
                                <div className={"border border-gray-400 rounded-l w-full p-1"}>Low Res 1 mpx</div>
                                <div className={"border border-gray-400 w-full rounded-r p-1 text-center font-rubik"}>$5.0</div>
                            </div>

                            <div className={"flex h-10 items-center"}>
                                <div className={"border border-gray-400 w-full rounded-l  p-1"}>Low Res 1 mpx</div>
                                <div className={"border border-gray-400 w-full rounded-r p-1 text-center font-rubik"}>$5.0</div>
                            </div>

                            <div className={"flex h-10 items-center"}>
                                <div className={"border border-gray-400 w-full rounded-l  p-1"}>Low Res 1 mpx</div>
                                <div className={"border border-gray-400 w-full rounded-r text-center p-1 font-rubik"}>$5.0</div>
                            </div>

                        </div>

                        <h3 className={"font-proximaBold"}>Commercial License</h3>
                        <div className={"items-center font-proxima gap-1 text-sm grid grid-cols-3"}>

                            <div className={"flex h-10 items-center"}>
                                <div className={"border border-gray-400 rounded-l w-full p-1"}>Low Res 1 mpx</div>
                                <div className={"border border-gray-400 w-full rounded-r p-1 text-center font-rubik"}>$5.0</div>
                            </div>

                            <div className={"flex h-10 items-center"}>
                                <div className={"border border-gray-400 w-full rounded-l  p-1"}>Low Res 1 mpx</div>
                                <div className={"border border-gray-400 w-full rounded-r text-center p-1 font-rubik"}>$5.0</div>
                            </div>

                            <div className={"flex h-10 items-center"}>
                                <div className={"border border-gray-400 w-full rounded-l  p-1"}>Low Res 1 mpx</div>
                                <div className={"border border-gray-400 w-full rounded-r text-center p-1 font-rubik"}>$5.0</div>
                            </div>

                        </div>






                    </div>


                </div>


            </div>


            <div className={"my-12 px-16"}>

                <h3>Comments</h3>

            </div>



        </div>
    )
}