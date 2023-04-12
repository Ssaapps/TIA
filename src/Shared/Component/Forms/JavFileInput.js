import LockIcon from "../Icons/LockIcon";
import UploadIcon from "../Icons/UploadIcon";
import {useRef, useState} from "react";
import ExcelIcon from "../Icons/ExcelIcon";
import PDFIcon from "../Icons/PDFIcon";
import CSVIcon from "../Icons/CSVIcon";
import {Circle} from "@react-google-maps/api";
import CircleProgress from "../CircleProgress";
import {useDispatch, useSelector} from "react-redux";
import {uploadResource} from "../../../Modules/Transactions/duck/action";

export default function JavFileInput () {
    const fileRef = useRef();
    const [data,setData] = useState(null);
    const [metaData,setMetaData] = useState(null);
    const dispatch = useDispatch();

    const transactionsState = useSelector( (state) => state.transactions)



    const onViewClicked = () => {
        fileRef.current.click();
    }

    function getBase64(file,onSuccess,onError) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>  onSuccess(reader.result);
        reader.onerror = (error) => onError(error);
    }

    const onFileChange = async (event) => {
        console.log("event",event);
        getBase64(event.target.files[0],(mData) => {
            setMetaData(event.target.files[0]);
            setData(mData);

            //upload the file
            dispatch(uploadResource({file: mData}))

        },(error) => {
            alert("Error: "+error)
        })
    }
    return (
        <div onClick={onViewClicked} className={"border rounded flex justify-around items-center p-10 border-dashed cursor-pointer border-2 border-gray-300"}>

            <input onChange={onFileChange} ref={fileRef} type={"file"} className={"hidden"}/>
            {
                data == null &&
                <div className={"text-center flex flex-col text-sm text-gray-500 items-center"}>
                    <UploadIcon
                        className={"text-gray-500"}
                    />
                    <span>Drop file here</span>
                </div>
            }

            {
                data != null &&
                <div className={"text-center flex flex-col text-sm text-gray-500 items-center"}>
                    {
                        metaData.type.includes("application/excel") && <ExcelIcon className={"text-gray-500"}/>
                    }
                    {
                        metaData.type.includes("application/pdf") && <PDFIcon className={"text-gray-500"}/>
                    }
                    {
                        (metaData.name.includes(".docx") || metaData.name.includes(".txt")) && <CSVIcon className={"text-gray-500"}/>
                    }


                    <span>{metaData.name}</span>
                </div>
            }

            <CircleProgress
                progress={12}
            />


        </div>
    )
}