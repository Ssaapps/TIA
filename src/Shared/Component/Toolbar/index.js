import MenuIcon from "../Icons/MenuIcon";
import Logo from "../Icons/Logo";
import SearchIcon from "../Icons/SearchIcon";
import { PostIcon } from "../Icons/PostIcon";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";

export default function Toolbar() {
    const navigate = useNavigate();
    const isAuth = !!useSelector((state) => state.login.token);

    return (
        <div className={"h-16 flex items-center px-10 justify-between bg-white"}>

            <div className={"flex items-center cursor-pointer"} onClick={() => navigate('/')}>
                {/*<MenuIcon fill={"#242A38"} className={"cursor-pointer"}/>*/}
                <Logo className={"h-4 mx-2"} />
            </div>

            <div>
                {/*Search*/}
                <div className={"border flex items-center  rounded py-1.5 px-2"}>
                    <input placeholder={"Search"} className={"outline-none text-sm w-96"} />
                    <SearchIcon />
                </div>
            </div>


            <div className={"flex items-center gap-x-4"}>
                {
                    !isAuth ? <>
                        <button onClick={()=>navigate("/login")} className="text-sm rounded-3xl hover:bg-gray-50 px-4 py-1.5">Sign In</button>
                        <button onClick={()=>navigate("/signup")} className="rounded-3xl text-sm text-gray-600 px-4 py-1.5  border-baseYellow hover:bg-gray-50  border-2 ">Sign Up</button>
                    </> : (
                        <>

                            <PostIcon className={"cursor-pointer stroke-2 stroke-[#eeb032]"} />
                            <img
                                className={"h-8  rounded-full w-8"}
                                src={"https://uploads-ssl.webflow.com/628e9463939e76fb3c1b7440/628ea85eef750d8b0a363ae5_Webcliptia.png"}
                            /> 
                            <button className="text-red-500 flex gap-x-2 px-3 py-1 border items-center text-sm rounded hover:bg-red-300 border-red-500">
                            <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                                Logout
                            </button>
                        </>
                    )
                }

            </div>


        </div>
    )
}