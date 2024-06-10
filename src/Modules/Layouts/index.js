
import Toolbar from "../../Shared/Component/Toolbar";
import { Outlet } from "react-router";

export default function AppLayout() {
    return (
        <div className={" bg-gray-50 dark:bg-gray-900 transition duration-300"}>
            <Toolbar />

            <Outlet />

        </div>
    )
}