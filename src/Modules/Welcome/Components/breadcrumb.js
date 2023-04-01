import LockIcon from "../../../Shared/Component/Icons/LockIcon";
import EyeIcon from "../../../Shared/Component/Icons/EyeIcon";
import CashIcon from "../../../Shared/Component/Icons/CashIcon";

export default function BreadCrumb() {
    return (
        <div style={{height: '600px'}} className={"bg-gray-200 flex flex-row items-center px-12"}>
            <img
                src={"https://combo.staticflickr.com/ap/build/images/sohp/2020-top-25/Mists_of_renfrew_Adam_Gibbs.jpg"}
                className={"h-5/6 w-3/5 object-cover rounded"}
            />
            <div className={"px-20"}>
                <h2 className={"font-rubik text-xl text-gray-900"}>Featured Editor Pick</h2>
                <h1 className={"text-3xl font-proxima"}>
                    New Picks: The boredom of a lady in a busy car
                </h1>
                <div className={"flex my-2 items-center"}>
                    <div className={"border-2 border-[#eeb032] rounded-full"}>
                        <img className={"h-12 w-12 rounded-full"} src={"https://uploads-ssl.webflow.com/628e9463939e76fb3c1b7440/628ea85eef750d8b0a363ae5_Webcliptia.png"}/>
                    </div>

                    <h2 className={"mx-2 font-proximaBold"}>
                        ThisisAccra Gallery
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