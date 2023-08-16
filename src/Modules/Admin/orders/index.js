import React, { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux";
import Table from "../../../Shared/Component/Table";
import JavButton from "../../../Shared/Component/Buttons/JavButton";
import YesNoDialog from "../../../Shared/Component/Dialog/YesNoDialog";
import {getOrders} from "./duck/action";
import DownloadIcon from "../../../Shared/Component/Icons/DownloadIcon";
import {downloadReceipt} from "../../../Shared/utils/common";
import LoadingIcon from "../../../Shared/Component/Icons/LoadingIcon";

export default function Orders() {
    const [selectedAlbum, setSelectedAlbum] = useState(null)
    const dispatch = useDispatch();
    const [selectedItemModel,setSelectItemModel] = useState(null);
    const groupState = useSelector( (state) => state.groups)
    const [downloadingOrder,setDownloadingOrder] = useState(null);


    useEffect(() => {
        dispatch(getOrders())
    }, [])

    useEffect(() => {
        console.log("downloadingOrder",downloadingOrder)
    },[downloadingOrder])

    const downloadOrder = (content) => {
        setDownloadingOrder(content.id);
        downloadReceipt(content.payment_reference).then(res => {
            console.log("data is ",res)
            if (downloadingOrder === content.id) {
                setDownloadingOrder(null);
            }
        }).catch(err => {
            console.log("Error is: ",err);
            if (downloadingOrder === content.id) {
                setDownloadingOrder(null);
            }
        })
    }

    const getStatusColor = (status) => {
        let color = "";
        switch (status) {
            case "paid":
                color = "bg-green-400"
                break;
            case "cancelled":
                color = "bg-red-400"
                break;
            case "pending":
                color = "bg-orange-300"
                break;
            default:
                color = "bg-gray-300"
        }
        return color;
    }

    return (
        <div className={"p-10"}>

            <YesNoDialog
                open={selectedItemModel != null}
                title={"Are you sure ?"}
                yesLoading={false}
                onYesClicked={() => {

                }}
                onNoClicked={() => setSelectItemModel(null)}
                onCloseClicked={() => setSelectItemModel(null)}
            >
                <div className="text-xs py-3">
                    Are you sure you want to delete album ?
                </div>
            </YesNoDialog>



            <h1 className="flex-1 text-2xl font-bold text-gray-900">Orders </h1>


            <Table
                link={"admin/orders"}
                tag={"albums.orders"}
                columns={["id","Name","Email","amount","description","status","Paid At","created_at","action"]}
                fields={["id",{
                    render: (content) => {
                        return (
                            <td className={"text-center"}>
                               USD {content.amount}
                            </td>
                        )
                    }
                },"user.name","user.email",{
                    render: (content) => {
                        return (
                            <td className={"text-center"}>
                                Purchase of {content.resource_name} Item of Id {content.resource_id}
                            </td>
                        )
                    }
                },"paid_at",{
                    render: (content) => {
                        return (
                            <td className={"text-center"}>
                                <span className={`${getStatusColor(content.status)} p-1 w-56 border rounded`}>
                                    {
                                        content.status
                                    }
                                </span>
                            </td>
                        )
                    }
                },"created_at",{
                    id: "id",
                    render: (content) => {
                        return (
                            <td>
                                <div className={`flex justify-center`}>

                                    <JavButton onClick={() => {
                                        downloadOrder(content);
                                    }} className={"p-1"} bgColor={"bg-gray-200 "}>
                                        {
                                            downloadingOrder === content.id ?
                                            <LoadingIcon className={"animate-spin"}/> :
                                            <DownloadIcon/>
                                        }
                                    </JavButton>

                                </div>
                            </td>
                        )
                    }
                }]}
            />
        </div>
    )
}
