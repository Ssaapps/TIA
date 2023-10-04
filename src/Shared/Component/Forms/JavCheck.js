export default function JavCheck(props) {

    return (
        <div className={" p-2 flex items-center"}>

            <input checked={props.value} type={"checkbox"} className="rounded" onChange={(event) => props.onChange(event)} />

            <span className={"mx-2  text-gray-600 text-[15px]"}>{props.title}</span>

        </div>
    )

}