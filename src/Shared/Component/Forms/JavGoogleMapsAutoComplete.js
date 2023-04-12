import {usePlacesWidget} from "react-google-autocomplete";
import {useEffect, useState} from "react";

export default function JavGoogleMapsAutoComplete(props) {


    const [address,setAddress] = useState();

    useEffect(() => {
        props.onChange({
            target: {
                        name: props.name,
                        value: address
                    }
        });
    },[address])

    const { ref } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
        options: {
            componentRestrictions: {
                country: [
                    "gh","us"
                ]
            },
            fields: ["address_components","formatted_address", "geometry", "icon", "name"],
            types: []
        },
        onPlaceSelected: (place) => {
            setAddress(place.name + " " + place.formatted_address);
            // props.onChange({
            //     target: {
            //         name: props.name,
            //         value: place.name + " " + place.formatted_address
            //     }
            // })
        }
    })


    return (
        <div className={"flex flex-col"}>
            <h3 className={`text-sm font-proximaBold text-gray-600`}>{props.title}</h3>
            <input
                ref={ref}
                value={props.value}
                onChange={props.onChange}
                name={props.name}
                className={"dark:bg-[#242A38] h-10 text-xs rounded-md px-1 border outline-none dark:text-white"}
            />
        </div>
    )
}