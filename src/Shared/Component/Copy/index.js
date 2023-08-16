import CopyIcon from "../Icons/CopyIcon";
import {useState} from "react";
import CheckBadgeIcon from "../Icons/CheckBadgeIcon";

export default function Copy(props) {

    const [copied,setCopied] = useState(false);

    const copyItem = async ()  =>  {
        try {
            let copyText = props.copyText;
            await navigator.clipboard.writeText(copyText ?? props.text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false)
            },1000)
        }
        catch (err) {
            alert("failed to copy")
        }
    }

    return (
        <div className={"flex items-center"}>
            <span className={"text-gray-500 dark:text-gray-50 text-sm "}>{props.text}</span>
            <div onClick={copyItem} className={`p-0.5 mx-2 cursor-pointer ${ copied ? 'bg-green-100' : 'bg-gray-200 dark:bg-gray-50' } rounded`}>
                {
                    copied ? <CheckBadgeIcon className={"h-9 w-9 text-green-600"}/>
                    : <CopyIcon className={"h-9 w-9 text-gray-600"}/>
                }

            </div>
        </div>
    )
}