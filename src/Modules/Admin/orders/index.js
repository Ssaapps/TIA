import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Table from "../../../Shared/Component/Table";
import JavButton from "../../../Shared/Component/Buttons/JavButton";
import YesNoDialog from "../../../Shared/Component/Dialog/YesNoDialog";
import { getOrders } from "./duck/action";
import DownloadIcon from "../../../Shared/Component/Icons/DownloadIcon";
import { downloadReceipt } from "../../../Shared/utils/common";
import LoadingIcon from "../../../Shared/Component/Icons/LoadingIcon";

export default function Orders() {
    const [selectedAlbum, setSelectedAlbum] = useState(null)
    const dispatch = useDispatch();
    const [selectedItemModel, setSelectItemModel] = useState(null);
    const groupState = useSelector((state) => state.groups)
    const [downloadingOrder, setDownloadingOrder] = useState(null);

    useEffect(() => {
        dispatch(getOrders())
    }, [])

    useEffect(() => {
        console.log("downloadingOrder", downloadingOrder)
    }, [downloadingOrder])

    const downloadOrder = (content) => {
        setDownloadingOrder(content.id);
        downloadReceipt(content.payment_reference).then(res => {
            console.log("data is ", res)
            if (downloadingOrder === content.id) {
                setDownloadingOrder(null);
            }
        }).catch(err => {
            console.log("Error is: ", err);
            if (downloadingOrder === content.id) {
                setDownloadingOrder(null);
            }
        })
    }

    const getStatusColor = (status) => {
        let color = "";
        switch (status) {
            case "paid":
                color = "text-green-600"
                break;
            case "cancelled":
                color = "text-red-600"
                break;
            case "pending":
                color = "text-orange-600"
                break;
            default:
                color = "text-gray-600"
        }
        return color;
    }

    return (
        <div className={"p-10 overflow-y-auto "}>

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
                columns={["id", "Name", "Email", "amount", "status", "Paid At", "created_at", "action"]}
                fields={["id", "user.name", "user.email", {
                    render: (content) => {
                        return (
                            <td className={"text-center"}>
                                USD {content.amount}
                            </td>
                        )
                    }
                }, {
                        render: (content) => {
                            return (
                                <td className={"text-center"}>
                                    <div className={`${getStatusColor(content.status)} p-1  rounded`}>
                                        {
                                            content.status
                                        }
                                    </div>
                                </td>
                            )
                        }
                    }, "paid_at", "created_at", {
                        id: "id",
                        render: (content) => {
                            return (
                                <td>
                                    <div className={`flex justify-center`}>

                                        <JavButton onClick={() => {
                                            downloadOrder(content);
                                        }} className={"p-1"} bgColor={"bg-gray-200 dark:bg-gray-300 "}>
                                            {
                                                downloadingOrder === content.id ?
                                                    <LoadingIcon className={"animate-spin"} /> :
                                                    <DownloadIcon />
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
