import MenuIcon from "../Icons/MenuIcon";
import Logo from "../Icons/Logo";
import SearchIcon from "../Icons/SearchIcon";
import {PostIcon} from "../Icons/PostIcon";
import {useNavigate} from "react-router";

export default function Toolbar() {
    const navigate = useNavigate();
    return (
        <div className={"h-16 flex items-center px-10 justify-between bg-white"}>

            <div className={"flex items-center cursor-pointer"} onClick={() => navigate('/')}>
                {/*<MenuIcon fill={"#242A38"} className={"cursor-pointer"}/>*/}
                <Logo className={"h-4 mx-2"}/>
            </div>

            <div>
                {/*Search*/}
                <div className={"border flex items-center  rounded py-1.5 px-2"}>
                    <input placeholder={"Search"} className={"outline-none text-sm w-96"}/>
                    <SearchIcon/>
                </div>
            </div>


            <div className={"flex items-center"}>
                <PostIcon className={"cursor-pointer stroke-2 stroke-[#eeb032]"}/>
                <img
                    className={"h-8 mx-4 rounded-full w-8"}
                    src={"https://uploads-ssl.webflow.com/628e9463939e76fb3c1b7440/628ea85eef750d8b0a363ae5_Webcliptia.png"}
                />
            </div>


        </div>
    )
}