import React, { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux";
import {getAlbums} from "./duck/action";
import Table from "../../../Shared/Component/Table";
import JavButton from "../../../Shared/Component/Buttons/JavButton";
import DeleteIcon from "../../../Shared/Component/Icons/DeleteIcon";
import YesNoDialog from "../../../Shared/Component/Dialog/YesNoDialog";

export default function Albums() {
    const [selectedAlbum, setSelectedAlbum] = useState(null)
    const dispatch = useDispatch();
    const [selectedItemModel,setSelectItemModel] = useState(null);



    const albumState = useSelector( (state) => state.albums)


    useEffect(() => {
        dispatch(getAlbums())
    }, [])


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





            <h1 className="flex-1 text-2xl font-bold text-gray-900">Albums</h1>


            <Table
                link={"albums"}
                tag={"albums.accounts"}
                columns={["id","name","description","action"]}
                fields={["id","name","description",{
                    id: "id",
                    render: (content) => {
                        return (
                            <td>
                                <div className={`flex justify-center`}>

                                    <JavButton onClick={() => {
                                        alert("clicked")
                                        setSelectItemModel(content)
                                    }} className={"p-1"} bgColor={"bg-gray-200 "}>
                                        <DeleteIcon/>
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
