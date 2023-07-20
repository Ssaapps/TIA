import MenuIcon from "../Icons/MenuIcon";
import Logo from "../Icons/Logo";
import SearchIcon from "../Icons/SearchIcon";
import { PostIcon } from "../Icons/PostIcon";
import { useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { logout } from "../../../Modules/Auth/duck/action";
import { ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Toolbar() {
    const navigate = useNavigate();
    const isAuth = !!useSelector((state) => state.login.login.token);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showCart, setShowCart] = useState(true);
    const location = useLocation();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }
    const cart = useSelector((state) => state.cart.items);



    useEffect(() => {
        console.log(cart)
        setShowCart(location.pathname !== "/cart");
    }, [location])


    return (
        <div className={"h-16 flex items-center px-10 justify-between bg-white"}>

            <div className={"flex items-center cursor-pointer"} onClick={() => navigate('/')}>
                {/*<MenuIcon fill={"#242A38"} className={"cursor-pointer"}/>*/}
                {/*<Logo className={"h-4 mx-2"} />*/}
                <img className={"h-10"} src={"/logo.png"} />
            </div>

            <div>
                {/*/!*Search*!/*/}
                {/*<div className={"border flex items-center  rounded py-1.5 px-2"}>*/}
                {/*    <input placeholder={"Search"} className={"outline-none text-sm w-96"} />*/}
                {/*    <SearchIcon />*/}
                {/*</div>*/}
            </div>


            <div className={"flex items-center gap-x-4"}>
                {
                    !isAuth ? <React.Fragment>
                        <button onClick={() => navigate("/login")} className="text-xs  sm:text-sm rounded-3xl hover:bg-gray-50 px-4 py-1.5">Sign In</button>
                        <button onClick={() => navigate("/register")} className="rounded-3xl text-xs  sm:text-sm text-gray-600 px-4 py-1.5  border-baseYellow hover:bg-gray-50  border-2 ">Sign Up</button>
                    </React.Fragment> : (
                        <React.Fragment>

                            {/*<PostIcon onClick={() => navigate('/admin?login=true')} className={"cursor-pointer stroke-2  stroke-[#1e4570]"} />*/}
                            {/*<img*/}
                            {/*    className={"h-8  rounded-full w-8"}*/}
                            {/*    src={"https://uploads-ssl.webflow.com/628e9463939e76fb3c1b7440/628ea85eef750d8b0a363ae5_Webcliptia.png"}*/}
                            {/*/>*/}
                            <button onClick={handleLogout} className="text-red-500 flex gap-x-2 px-3 py-1 border items-center text-xs  sm:text-sm rounded-3xl hover:bg-red-300 border-red-500">
                                {/* <ArrowLeftOnRectangleIcon className="h-4 w-4" /> */}
                                Logout
                            </button>

                            <button className="" onClick={() => navigate("/profile")}>
                                <UserCircleIcon
                                    className="h-8 w-8 hover:text-gray-400 flex-shrink-0 text-gray-600  group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                            </button>

                        </React.Fragment>
                    )

                }
                {showCart && <button className="group -m-2 flex items-center p-4" onClick={() => {
                    navigate("/cart")
                }}>
                    <ShoppingBagIcon
                        className="h-7 w-7 flex-shrink-0 text-gray-600  group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                </button>
                }

            </div>


        </div>
    )
}