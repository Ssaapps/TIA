import {useEffect, useState} from "react";

export default function JavCheckMultiSelect(props) {

    const [selectedItems,setSelectedItems] = useState([]);

    useEffect(() => {
        props.onSelectionChanged(selectedItems);
    },[selectedItems])

    return (
        <div className={" "}>
            <h3 className="text-sm  font-proximaBold text-gray-600">{props.title}</h3>

            <div className={"grid px-2 py-4 mt-1 rounded bg-white grid-cols-3 gap-4"}>
                {
                    props.items && props.items.map(it => {
                        return (
                            <div className={"flex p-2.5 rounded border"}>
                                <input onChange={(event) => {
                                    if (event.target.checked) {
                                        setSelectedItems([...selectedItems,it]);
                                    }else {
                                        setSelectedItems(selectedItems.filter(i => {
                                           return i !== it
                                        }));
                                    }
                                }} type={"checkbox"} />
                                <span className={"mx-2 text-gray-700 text-sm"}> { it.title ? it.title : it } </span>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}