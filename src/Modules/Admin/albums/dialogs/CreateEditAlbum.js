import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import JavTextArea from "../../../../Shared/Component/Forms/JavTextArea";
import CloseIcon from "../../../../Shared/Component/Icons/CloseIcon";
import JavInput from "../../../../Shared/Component/Forms/JavInput";
import JavButton from "../../../../Shared/Component/Buttons/JavButton";
import { editAlbum } from "../duck/action";
import JavFormSelect from "../../../../Shared/Component/Forms/JavFormSelect";
import JavCheck from "../../../../Shared/Component/Forms/JavCheck";
export default function CreateEditAlbum(props) {

    const dispatch = useDispatch();


    const [form, setForm] = useState({
        name: "",
        description: "",
        status: ""
    });
    const [pricePerMediaChecked, setPricePerMediaChecked] = useState(false)

    useEffect(() => {
        console.log("props", props)
        if (props.album) {
            console.log("album", props.album)
            setForm({
                ...form,
                name: props.album.name,
                description: props.album.description,
                status: props.album.status
            })
        }
    }, [props.album])

    const handleChanges = (event) => {
        const value = event.target.value;
        setForm({
            ...form,
            [event.target.name]: value
        })
    }

    const createRole = () => {
        dispatch(editAlbum(props?.album?.id, form))
    }

    if (!props.open) {
        return <></>;
    }

    return (
        <div className={`absolute flex z-10 justify-center
                        items-center p-2 top-0 left-0
                        w-screen h-screen bg-gray/10
                        backdrop-blur-sm`}>

            <div className={"min-w-[30%] bg-white border rounded"}>

                <div className="border-b py-3 px-2 flex
                                items-center justify-between">

                    <h3 className="text-sm font-proximaBold
                                   text-blue-900 text-gray-700">
                        Edit Album
                    </h3>

                    <CloseIcon onClick={props.onCloseClicked} className={"cursor-pointer"} />

                </div>


                <div className={"grid grid-cols-1 mb-0 dark:bg-[#242A38] dark:border-gray-600 gap-x-0 gap-y-2 py-4 px-4 my-2"}>

                    <JavInput
                        title={"Title"}
                        name={"title"}
                        value={form.name}
                        onChange={handleChanges}
                    />

                    <JavTextArea
                        title={"description"}
                        name={"description"}
                        value={form.description}
                        rows={3}
                        onChange={handleChanges}
                    />

                    <JavFormSelect
                        title={"Select Status"}
                        items={[
                            "published",
                            "not-published"
                        ]}
                        value={form.status}
                        position={"bottom"}
                        onChange={(status) => setForm({ ...form, status })}
                    />
                    <div className="flex gap-x-3 items-center">
                        <JavCheck title={"Price Per Media"} value={pricePerMediaChecked} onChange={(e) => setPricePerMediaChecked(e.target.checked)} />
                        {pricePerMediaChecked && <div className="flex items-center gap-x-2.5">
                            <span className={"  text-gray-600 text-lg"}>&#8364;</span>
                            <JavInput
                                type={"number"}
                                className="[&input]:text-base"
                                height={"h-8"}
                                width={"w-1/2"}
                                name={"price_per_media"}
                                value={form.price_per_media}
                                onChange={handleChanges}
                            />
                        </div>
                        }



                    </div>



                    <div className={"w-full flex justify-center items-center mt-5"}>

                        <JavButton
                            title={"Edit Album"}
                            padding={"px-16 py-3"}
                            textColor={"text-white"}
                            isLoading={false}
                            onClick={createRole}
                        />

                    </div>




                </div>






            </div>
        </div >
    )
}