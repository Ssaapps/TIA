import LoadingIcon from "../Icons/LoadingIcon";

export default function JavButton(props) {

    const bgColor = props.bgColor ? props.bgColor : 'bg-blue-600';
    const textColor = props.textColor ? props.textColor : 'text-gray-700';
    const padding = props.padding ? props.padding : 'p-3';

    return (
        <button
            disabled={props.disabled}
            className={`flex items-center justify-center 
                            rounded
                            font-proximaBold
                            text-xs border 
                            ${bgColor}
                            ${padding}
                            ${textColor ? textColor : 'text-gray-100'} ${props.className}`}
            onClick={props.onClick}

        >
            {props.title}
            {
                props.hideChildrenWhenLoading && props.isLoading ? "" :
                props.children
            }
            { props.isLoading &&
                <LoadingIcon className={`animate-spin h-5 w-5 mx-2 fill-white ${props.isLoading ? 'block' : 'hidden'}`}/>
            }
        </button>
    )
}