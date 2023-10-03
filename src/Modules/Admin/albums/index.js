import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteAlbum, doReload, getAlbums, getLastReload } from "./duck/action";
import Table from "../../../Shared/Component/Table";
import JavButton from "../../../Shared/Component/Buttons/JavButton";
import DeleteIcon from "../../../Shared/Component/Icons/DeleteIcon";
import YesNoDialog from "../../../Shared/Component/Dialog/YesNoDialog";
import ErrorAlert from "../../../Shared/Component/Alert/Error";
import EditIcon from "../../../Shared/Component/Icons/EditIcon";
import CreateEditAlbum from "./dialogs/CreateEditAlbum";
import { useNavigate } from "react-router";
import Copy from "../../../Shared/Component/Copy";
import { generateRandomNumber } from "../../../Shared/utils/common";
import moment from "moment";

export default function Albums() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedAlbum, setSelectedAlbum] = useState(null)
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [selectedItemModel, setSelectItemModel] = useState(null);
    const [error, setError] = useState(null);
    const [tableVersion, setTableVersion] = useState(0);

    const albumState = useSelector((state) => state.albums)

    useEffect(() => {
        dispatch(getAlbums())
        dispatch(getLastReload())
    }, [])

    const onAlbumsMediaClicked = (content) => {
        navigate(`/admin/photos?album=${content.uuid}`)
    }

    useEffect(() => {
        const deleteError = albumState.delete?.error
        const editError = albumState.edit?.error
        const reloadError = albumState.lastReload?.reload?.error || albumState.lastReload?.error
        setError(deleteError)
        setError(editError);
        setError(reloadError);

        if (albumState.edit.success) {
            setShowCreateDialog(false);
            setTableVersion(tableVersion + 1);
        }

    }, [albumState])

    return (
        <div className={"p-10 overflow-y-auto"}>


            <YesNoDialog
                open={selectedItemModel != null}
                title={"Are you sure ?"}
                yesLoading={false}
                onYesClicked={() => {

                    dispatch(deleteAlbum(selectedItemModel.id, () => {
                        setSelectItemModel(null)
                        window.location.reload()

                    }, () => {
                        setSelectItemModel(null)
                    }))

                }}
                onNoClicked={() => setSelectItemModel(null)}
                onCloseClicked={() => setSelectItemModel(null)}
            >
                <div className="text-xs py-3">
                    Are you sure you want to delete album ?
                </div>
            </YesNoDialog>

            <ErrorAlert timeout={3000} open={error} message={error} onClose={() => { setError(null) }} />

            <CreateEditAlbum
                album={selectedAlbum}
                open={showCreateDialog && selectedAlbum != null}
                onCloseClicked={() => { setShowCreateDialog(false) }}
                on
            />

            <div className={"flex justify-between"}>
                <h1 className="flex-1 text-2xl font-bold text-gray-900">Albums</h1>
                <div className={"flex items-center text-sm "}>
                    {/* TODO: Map albumState.lastReload.data to the value here */}
                    <span className={"text-xs mx-2"}>Last Reload: {moment().fromNow()}</span>
                    <JavButton isLoading={albumState?.lastReload?.reload?.isLoading} onClick={() => {
                        dispatch(doReload())
                    }} className={"text-white"}>Reload</JavButton>
                </div>
            </div>



            <Table
                link={"admin/albums"}
                tag={"albums.accounts"}
                currentVersion={tableVersion}
                columns={["id", "name", "description", "media", "status", "action"]}
                fields={["id", "name", "description", {
                    id: "order_id",
                    render: (content) => {
                        return (
                            <td className={"text-center underline"}>
                                <span onClick={() => onAlbumsMediaClicked(content)} className={"underline cursor-pointer text-blue-800 align-baseline"}>{content.media_count} pictures</span>
                            </td>
                        )
                    }
                }, "status", {
                        id: "id",
                        render: (content) => {
                            return (
                                <td>
                                    <div className={`flex justify-center`}>

                                        <JavButton onClick={() => {
                                            setSelectedAlbum(content);
                                            setShowCreateDialog(true)
                                        }} className={"p-1 mx-1"} bgColor={"bg-gray-200 "}>
                                            <EditIcon />
                                        </JavButton>



                                        <JavButton onClick={() => {
                                            setSelectItemModel(content)
                                        }} className={"p-1"} bgColor={"bg-red-500"}>
                                            <DeleteIcon className={"stroke-white"} />
                                        </JavButton>


                                        <Copy copyText={`https://photos.uipmworld.org/api/v1/albums/${content.uuid}/download?uid=${generateRandomNumber()}`} />


                                    </div>
                                </td>
                            )
                        }
                    }]}
            />
        </div>
    )
}
