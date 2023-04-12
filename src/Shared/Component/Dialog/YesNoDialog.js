import CloseIcon from "../Icons/CloseIcon";
import {useEffect} from "react";
import JavButton from "../Buttons/JavButton";

export default function YesNoDialog(props) {

    useEffect(() => {

    },[]);

    if (!props.open) {
        return <></>;
    }

    return (
        <div className="absolute flex z-10 justify-center
                        items-center p-2 top-0 left-0
                        w-screen h-screen bg-gray/10
                        backdrop-blur-sm">

            <div className={"w-96 bg-white border px-4 rounded"}>

                <div className="border-b py-3 flex
                                items-center justify-between">

                    <h3 className="text-sm font-proximaBold
                                   text-blue-900 text-gray-700">
                        { props.title }
                    </h3>

                    <CloseIcon onClick={props.onCloseClicked} className={"cursor-pointer"}/>

                </div>

                <div className="py-3 px-3">
                    {props.children}
                </div>

                <div className="grid gap-x-4
                                grid-cols-2 pb-2">

                    <JavButton onClick={props.onNoTapped}
                               isLoading={false}
                               className={"bg-gray-500 text-white"}
                               textColor={"text-white"}
                               title={ props.noTitle ? props.noTitle : "No" }
                    />

                    <JavButton onClick={props.onYesClicked}
                               isLoading={props.yesLoading}
                               textColor={"text-white"}
                               title={ props.yesTitle ? props.yesTitle : "Yes" }
                    />


                </div>

            </div>

        </div>
    )
}