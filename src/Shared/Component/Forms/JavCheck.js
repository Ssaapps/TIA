export default function JavCheck(props) {

    return (
        <div className={"border p-2 flex "}>

            <input checked={props.value} type={"checkbox"} onChange={ (event) => props.onChange(event) }/>

            <span className={"mx-2 text-gray-700"}>{props.title}</span>

        </div>
    )

}