
import Toolbar from "../../Shared/Component/Toolbar";
import EyeIcon from "../../Shared/Component/Icons/EyeIcon";
import MessageIcon from "../../Shared/Component/Icons/MessageIcon";
import AddIcon from "../../Shared/Component/Icons/AddIcon";
import CashIcon from "../../Shared/Component/Icons/CashIcon";
import LockIcon from "../../Shared/Component/Icons/LockIcon";
import {Outlet} from "react-router";

export default function AppLayout() {
    return (
        <div className={"h-screen w-screen bg-gray-50"}>
            <Toolbar/>

            <Outlet/>


        </div>
    )
}