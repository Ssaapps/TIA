import SearchIcon from "../Icons/SearchIcon";
import {forwardRef, useRef} from "react";
import LoadingIcon from "../Icons/LoadingIcon";

function JavInput(props,ref) {

    const text = useRef();

    return (
        <div className={`flex ${props.isColumn ? 'flex-row' : 'flex-col'} ${props.className}`}>

            <h3 className={`text-sm ${props.isColumn ? 'w-2/5 bg-gray-100 dark:bg-[#242A38] flex items-center px-2' : ''} font-proximaBold text-gray-600`}>{props.title}</h3>

            <div className={`flex ${props.isColumn ? 'w-3/5' : ''}`}>

                <input onChange={props.onChange}
                       onFocus={props.onFocus}
                       value={props.value}
                       className={`outline-none flex-1 h-10 ${props.height} ${props.hideBorder ? '' : 'border dark:border-gray-500'} 
                                    dark:bg-[#242A38]  text-xs rounded-md px-1 dark:text-white`}
                       placeholder={props.placeholder}
                       type={props.type}
                       name={props.name}
                       ref={ref}
                       disabled={props.disabled}
                       readOnly={props.readOnly}
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

export default forwardRef(JavInput);