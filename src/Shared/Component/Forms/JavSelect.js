import {useEffect, useRef, useState} from "react";
import useOnClickOutside from 'use-onclickoutside'
import ArrowDownIcon from "../Icons/Arrow/ArrowDownIcon";

export default function JavSelect(props) {

    const [opened,setOpened] = useState(false)
    const [value,setValue] = useState(null)

    const getPosition = (position) => {
        switch (position) {
            case "bottom":
                return "left-0 right-0";
            default:
                return "-top-52 left-0 right-0"
        }
    }
    const ref = useRef(null);
    useOnClickOutside(ref, (e) => {
        if (e.target) {
            if (e.target.dataset.class !== "allowed") {
                if (opened) {
                    setOpened(false);
                }
            }
        }
    })

    useEffect(() => {
        if (props.value) {
            setValue(props.value)
        }else if (props.items && props.items.length > 0) {
            let text = props.items[0];
            if (props.items[0] instanceof Object) {
                text = props.items[0].title;
            }
        }
    },[])

    return (

        <div className={`flex bg-white dark:bg-[#242A38] items-center text-gray-600 ${props.bgColor}`}>
            { props.title && <span className={"text-xs pt-0 mx-1"}>{props.title}</span>}
            <div className={`relative ${props.hideBorder ? '' : 'border dark:border-gray-500'} w-full rounded px-1 py-2.5`}>

                <div className={"flex"}>
                    <input data-class={"allowed"} ref={ref}
                           className={"outline-none cursor-pointer w-full text-xs bg-white dark:bg-[#242A38] dark:text-gray-100"}
                           onFocus={() => { setOpened(true) }}
                           value={value}
                    />
                    {
                        props.showArrowIcon &&
                        (
                            <ArrowDownIcon onClick={() => setOpened(true)} className={"w-4 h-4 cursor-pointer"}/>
                        )
                    }
                </div>



                <div className={`mt-4 absolute z-50 border 
                            overflow-hidden overflow-y-auto
                            rounded-lg max-h-44 bg-white 
                            mb-2 rounded
                           ${getPosition(props.position)}
                         ${opened ? 'block' : 'hidden'}
                         `}
                >
                    {
                        props.items && props.items.map((item,index) => {
                            let text = item;
                            if (item instanceof Object) {
                                text = item.title;
                            }

                            return (
                                <div key={index} data-class={"allowed"} onClick={() => {
                                    setValue(text)
                                    setOpened(false)
                                    props.onChange(item);
                                }}
                                     className="h-10 px-6 border-t flex text-gray-600
                            hover:bg-gray-50 text-xs cursor-pointer
                             items-center">
                                    {
                                        text
                                    }
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}