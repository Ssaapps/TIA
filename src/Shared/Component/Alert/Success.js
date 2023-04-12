import {useEffect} from "react";

export default function SuccessAlert(props) {

    useEffect(() => {
        if (props.open) {
            setTimeout(() => {
                props.onClose();
            },1500)
        }
    },[props.open])

    return (
        <div className={`
            ${props.open && props.open ? 'block' : 'hidden'}
            absolute top-0 left-0 right-0 z-30
            flex justify-center
        `}>

            <div className={`
                 bg-green-500 text-xs text-white font-firmaBold
                 px-10 py-2 my-20 rounded border border-green-600
                 relative
            `}>
                {props.message}

                <div onClick={props.onClose} className={`absolute top-1 right-2
                                 font-firmaBold 
                                 cursor-pointer z-20`}>

                    <svg className="w-4 h-4 fill-red-600"
                         stroke="currentColor"
                         viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">

                        <path strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={4}
                              d="M6 18L18 6M6 6l12 12" />

                    </svg>

                </div>
            </div>


        </div>
    )
}