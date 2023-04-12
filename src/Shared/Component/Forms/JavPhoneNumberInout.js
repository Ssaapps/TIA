import JavFormSelect from "./JavFormSelect";
import JavInput from "./JavInput";

export default function JavPhoneNumberInput(props) {
    return (
        <div className={""}>
            <h3 className={`text-sm font-proximaBold text-gray-600 ${props.isColumn ? 'w-2/5 bg-gray-100 dark:bg-[#242A38] flex items-center px-2' : ''}`}>{props.title}</h3>
            <div className={"grid grid-cols-6"}>
                <div className={""}>
                    <JavFormSelect
                        items={["GHS"]}
                        position={"bottom"}
                    />
                </div>
                <div className={"col-span-5"}>
                    <JavInput/>
                </div>
            </div>

        </div>
    )
}