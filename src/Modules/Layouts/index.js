
import Toolbar from "../../Shared/Component/Toolbar";
import {Outlet} from "react-router";

export default function AppLayout() {
    return (
        <div className={"h-screen w-screen bg-gray-50"}>
            <Toolbar/>

            <Outlet/>

        </div>
    )
}