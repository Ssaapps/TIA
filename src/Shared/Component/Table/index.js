import JavButton from "../Buttons/JavButton";
import ExcelIcon from "../Icons/ExcelIcon";
import CSVIcon from "../Icons/CSVIcon";
import PDFIcon from "../Icons/PDFIcon";
import JavInput from "../Forms/JavInput";
import JavSelect from "../Forms/JavSelect";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataForTable } from "./duck/action";
import { getParameterByName, getTableData } from "../../utils/common";


function Table(props, ref) {

    const dispatch = useDispatch();
    const tableState = useSelector((state) => state.table)
    const [tableData, setTableData] = useState([]);
    const [tableDataNoneText, setTableDataNoneText] = useState("");
    const [links, setLinks] = useState([]);
    const [config, setConfig] = useState({
        pageSize: props.pageNumbers ? props.pageNumbers[0] : 10,
        page: 1,
        link: props.link,
        pageNumbers: props.pageNumbers ? props.pageNumbers : [10, 25, 50, 100, "All"]
    })
    const [tableSummary, setTableSummary] = useState("...");


    useImperativeHandle(ref, () => {
        return {
            isLoading: () => {
                return tableState.fetch.loading
            }
        }
    }, [tableState])



    useEffect(() => {
        if (props.link) {
            setTableData([]);
            dispatch(getDataForTable(config,props.tag))
        }
    }, [props.currentVersion])

    useEffect(() => {
        if (props.link) {
            dispatch(getDataForTable(config, props.tag))
        }
    }, [config])

    useEffect(() => {
        if (props.link) {
            console.log("link is ", config)
            setConfig({ ...config, link: props.link })
            // console.log("proplink is ",props.link)
            // dispatch(getDataForTable(config,props.tag))
        }
    }, [props.link])

    useEffect(() => {
        if (props.fields) {
            if (tableState.fetch[props.tag]) {
                setTableData(getTableData(tableState.fetch[props.tag].data, props.fields));
                setLinks(tableState.fetch[props.tag].links)
                setTableSummary(`${tableState.fetch[props.tag].from || '0'} - ${tableState.fetch[props.tag].to || '0'} of ${tableState.fetch[props.tag].total}`)
                console.log("tableState", tableData);
                if (props.onLoadingDone) {
                    props.onLoadingDone();
                }
            }
        }
    }, [tableState, props.dependencies])

    useEffect(() => {

    }, [props.dependencies])

    return (
        <div className={"rounded-md bg-white py-2"}>
            <div className="flex flex-row justify-between">

                <div className={"flex items-center"}>

                    <JavButton bgColor={"dark:bg-[#242A38]"}
                        textColor={"text-gray-600"}
                        className={"h-8 border border-gray-300 dark:border-gray-500"}
                        title={"excel"}>
                        <ExcelIcon className={"fill-green-800"} />
                    </JavButton>

                    <JavButton bgColor={"dark:bg-[#242A38]"}
                        textColor={"text-gray-600"}
                        className={"h-8 border mx-2 border-gray-300 dark:border-gray-500"}
                        title={"csv"}>
                        <CSVIcon className={"w-4 mx-2 h-4 fill-blue-600"} />
                    </JavButton>

                    <JavButton bgColor={"dark:bg-[#242A38]"}
                        textColor={"text-gray-600"}
                        className={"h-8 border border-gray-300 dark:border-gray-500"}
                        title={"pdf"}>
                        <PDFIcon className={"w-4 mx-2 h-4 fill-red-600"} />
                    </JavButton>
                </div>
                <JavInput className={"text-xs dark:bg-[#242A38]"} placeholder={"Search"} />

            </div>

            <table className={`w-full my-4 font-proxima text-xs ${props.notFixed ? '' : 'table-fixed'}`}>
                <thead>
                    <tr className="border dark:border-gray-600 dark:bg-[#242A38]
                               text-left dark:text-white h-12 rounded ">
                        {props.columns && props.columns.map((column, index) => {
                            return (
                                <th key={index} className={"text-center"}>
                                    {column}
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody className={"dark:bg-[#242A38] text-gray-700 dark:text-gray-200"}>
                    {
                        props.data && props.data.map((data, index) => {
                            return (
                                <tr key={index} className="border dark:border-gray-600 text-left h-12 rounded ">
                                    {
                                        data.fields && data.fields.map((field, fieldIndex) => {
                                            if (field.render) {
                                                return field.render(field.content);
                                            }
                                            return (
                                                <td key={fieldIndex} className={"text-center"}>
                                                    {field.title}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    {
                        props.data && props.data.length === 0 &&
                        <div>
                            no data
                        </div>
                    }

                    {
                        tableData && tableData.map((data, index) => {
                            return (
                                <tr key={index} className="border border dark:border-gray-600 text-left h-12 rounded ">
                                    {
                                        data.fields && data.fields.map((field, index2) => {
                                            if (field.render) {
                                                return field.render(field.content, index);
                                            }
                                            return (
                                                <td key={index2} className={"text-center"}>
                                                    {field.title}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                    {
                        // tableData && tableData.length === 0 &&
                        // <tr key={-1} className="border border dark:border-gray-600 text-left h-12 rounded ">
                        //     <td colSpan={props.columns.length} className={""}>
                        //         <div className={"flex text-gray-500 items-center justify-center"}>
                        //            
                        //         </div>
                        //     </td>
                        // </tr>
                    }
                </tbody>
            </table>

            <div className={"flex pb-10 items-center  justify-between"}>

                <div className="pl-1 ">
                    <JavSelect items={config.pageNumbers}
                        title={"Rows per page"}
                        position={"ada"}
                        onChange={(item) => {
                            setConfig({
                                ...config,
                                pageSize: item
                            })
                        }}
                    />
                </div>

                <div className={"flex"}>
                    {
                        links && links.map((link, index) => {
                            return (
                                <a key={index} onClick={() => {
                                    if (link.url) {
                                        let page = getParameterByName("page", link.url);
                                        setConfig({
                                            ...config,
                                            page: parseInt(page)
                                        })
                                    }

                                }} className={`h-8 w-8 ${!link.active ? 'text-blue-900' : 'text-gray-400'} font-proximaBold
                                                cursor-pointer text-xs flex mx-1 items-center
                                                 justify-center border rounded`}>
                                    {
                                        link.label
                                            .replaceAll("&raquo;", "")
                                            .replaceAll("Previous", "<")
                                            .replaceAll("Next", ">")
                                            .replaceAll("&laquo;", "")
                                    }
                                </a>
                            )
                        })
                    }

                </div>

                <div className={"pr-10 text-gray-600 text-xs flex items-center"}>
                    <span>{tableSummary}</span>
                </div>

            </div>


        </div>
    )
}



export default forwardRef(Table)