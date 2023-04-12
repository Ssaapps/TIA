import SearchIcon from "../Icons/SearchIcon";
import {useRef} from "react";
import LoadingIcon from "../Icons/LoadingIcon";

export default function JavTextArea(props) {

    const text = useRef();

    return (
        <div className={`flex flex-col ${props.className}`}>


            <h3 className={`text-sm font-proximaBold text-gray-600`}>{props.title}</h3>

            <div className={"flex"}>

                <textarea onChange={props.onChange}
                       onFocus={props.onFocus}
                       value={props.value}
                       className={`outline-none flex-1 ${props.height} ${props.hideBorder ? '' : 'border'} 
                                    dark:bg-[#242A38] text-xs rounded-md px-1 dark:text-white`}
                       placeholder={props.placeholder ? props.placeholder : props.name}
                       type={props.type}
                       name={props.name}
                       rows={props.rows}
                       ref={text}
                />

                <div className={`w-12 flex items-center justify-center
                                bg-white border cursor-pointer 
                                rounded mx-1 ${props.hasRightButton ? '' : 'hidden'}`}
                    onClick={() => props.onRightButtonClicked(text.current)}
                >
                    {
                        props.isLoading ?
                            <LoadingIcon
                                className={`animate-spin h-5 w-5 mx-2
                                            fill-gray-600 ${props.isLoading ? 'block' : 'hidden'}`}
                            /> :
                            <SearchIcon/>
                    }
                </div>

            </div>


        </div>
    )
}