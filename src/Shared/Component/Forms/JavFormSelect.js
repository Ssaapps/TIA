import JavSelect from "./JavSelect";

export default function JavFormSelect(props) {
    return (
        <div className={`flex ${props.isColumn ? 'flex-row' : 'flex-col'}  ${props.className}`}>

            <h3 className={`text-sm font-proximaBold text-gray-600 ${props.isColumn ? 'w-2/5 bg-gray-100 dark:bg-[#242A38] flex items-center px-2' : ''}`}>{props.title}</h3>

            <div className={`${props.isColumn ? 'w-3/5' : ''}`}>
                <JavSelect
                    selected={props.selected}
                    onChange={props.onChange}
                    bgColor={props.bgColor}
                    items={props.items}
                    position={props.position}
                    hideBorder={props.hideBorder}
                    value={props.value}
                    showArrowIcon={true}
                />
            </div>


        </div>
    )
}