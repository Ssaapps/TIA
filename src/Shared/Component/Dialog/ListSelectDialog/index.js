import CloseIcon from "../../Icons/CloseIcon";
import JavInput from "../../Forms/JavInput";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getData} from "./duck/action";

export default function ListSelectDialog(props) {

    const [list,setList] = useState([]);
    const [filteredList,setFilteredList] = useState([]);
    const dispatch = useDispatch();
    const [config,setConfig] = useState({
        link: props.link,
        query: {}
    })
    const listState = useSelector( (state) => state.list)

    useEffect(() => {
        if (listState.fetch.data) {
            setList(listState.fetch.data)
            setFilteredList(listState.fetch.data)
        }
    },[listState])

    useCallback(() => {

    },[])

    useEffect(() => {
        console.log("config changed")
        if (config.link) {
            dispatch(getData(config))
        }
    },[config])


    if (!props.open) {
        return <React.Fragment></React.Fragment>;
    }

    return (
        <div className={`absolute flex z-10 justify-center
                        items-center p-2 top-0 left-0
                        w-screen h-screen bg-gray/10
                        backdrop-blur-sm`}>

            <div className={"min-w-[50%] bg-white border rounded"}>

                <div className="border-b py-3 px-2 flex
                                items-center justify-between">

                    <h3 className="text-sm font-proximaBold
                                   text-blue-900 text-gray-700">
                        { props.title || "Select Item" }
                    </h3>

                    <CloseIcon onClick={props.onCloseClicked} className={"cursor-pointer"}/>

                </div>

                <div className={"px-2"}>
                    <JavInput placeholder={"search"}
                              hideBorder={true}
                              onChange={(event) => {
                                  let filtered = list.filter((item) => {
                                      return item[props.searchField].toLowerCase().includes(event.target.value.toLowerCase())
                                  })
                                  setFilteredList(filtered);
                              }}
                    />
                </div>


                <div className={"border-t mx-3 h-96 overflow-y-auto"}>
                    {
                        filteredList.map((item,index) => {
                            return (
                                <div key={index} onClick={() => {
                                    let val = props.onItemSelected(item)
                                    if (val.next_link) {
                                        setConfig({
                                            link: val.next_link,
                                            query: {}
                                        })
                                        console.log(config)
                                        console.log("cause reload")
                                    }
                                }} className={`py-3 border-b cursor-pointer text-xs text-gray-700`}>
                                    {props.render(item,index)}
                                </div>
                            )
                        })
                    }

                </div>



            </div>


        </div>
    )
}