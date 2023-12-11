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
import { MoonIcon, ShoppingBagIcon, SunIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Dialog, Menu, Transition } from '@headlessui/react'
import { classNames } from "../../utils/common";
import AdminIcon from "../Icons/AdminIcon";
import { HomeIcon } from "@heroicons/react/20/solid";
import { ADMIN_ROLE_ID } from "../../utils/constants";
import useLocalStorage from "../../utils/hooks/localStorage";

export default function Toolbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") ?? "{}");
    const isAuth = !!useSelector((state) => state.login.login.token);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showCart, setShowCart] = useState(true);
    const location = useLocation();
    const dispatch = useDispatch();
    const [theme, setTheme] = useLocalStorage("theme");
    const cart = useSelector((state) => state.cart.items);

    const isAdmin = (roles) => {
        return roles.filter(item => item["id"] === ADMIN_ROLE_ID).length > 0;
    }

    useEffect(() => {
        console.log(cart)
        setShowCart(location.pathname !== "/cart");
    }, [location])



    const userNavigation = [
        {
            name: 'Your profile', href: '#', onClick: () => {
                navigate("/profile")
            },
        },
        {
            name: 'Sign out', href: '#', onClick: () => {
                dispatch(logout())
                window.location.replace("/")
            }
        },
    ]

    const handleThemeToggle = () => {
        if (theme !== "dark" || (!('theme' in localStorage))) {
            document.documentElement.classList.add('dark')
            setTheme("dark")
        } else {
            document.documentElement.classList.remove('dark')
            setTheme(undefined)
        }

    }

    useEffect(() => {
        handleThemeToggle()
    }, [])

    return (
        <div className={"h-16 flex items-center px-10 justify-between bg-white dark:bg-gray-900 transition duration-300"}>

            <div className={"flex items-center cursor-pointer"} onClick={() => navigate('/')}>
                {/*<MenuIcon fill={"#242A38"} className={"cursor-pointer"}/>*/}
                {/*<Logo className={"h-4 mx-2"} />*/}
                {
                    theme == "dark" ? <img className={"h-6"} src={"/logo-white.png"} /> : <img className={"h-10"} src={"/logo.png"} />

                }
            </div>


            <div className=" gap-x-6 flex items-center">
                <div className={"flex items-center gap-x-4"}>
                    {
                        !isAuth ? <React.Fragment>
                            <button onClick={() => navigate("/login")} className="text-xs  sm:text-sm rounded-3xl hover:bg-gray-50 px-4 py-1.5">Sign In</button>
                            <button onClick={() => navigate("/register")} className="rounded-3xl text-xs  sm:text-sm text-gray-600 px-4 py-1.5  border-baseYellow hover:bg-gray-50  border-2 ">Sign Up</button>
                        </React.Fragment> : (
                            <React.Fragment>
                                <Menu as="div" className="relative flex-shrink-0">
                                    <div>
                                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            <UserCircleIcon
                                                className="h-8 w-8 hover:text-gray-400 flex-shrink-0 text-gray-600  group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={React.Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name} onClick={item.onClick}>
                                                    {({ active }) => (
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            {item.name}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                {/*<PostIcon onClick={() => navigate('/admin?login=true')} className={"cursor-pointer stroke-2  stroke-[#1e4570]"} />*/}
                                {
                                    isAdmin(user?.roles) &&
                                    <PostIcon onClick={() => navigate('/admin')} className={"cursor-pointer stroke-blue-800"} />
                                }



                            </React.Fragment>
                        )

                    }
                    {showCart && <button className="group -m-2 flex items-center p-4" onClick={() => {
                        navigate("/cart")
                    }}>
                        <ShoppingBagIcon
                            className="h-7 w-7 flex-shrink-0 text-gray-600 dark:text-gray-300 dark:group:hover:text-gray-400  group-hover:text-gray-500"
                            aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300  group-hover:text-gray-800">{cart.length}</span>
                        <span className="sr-only">items in cart, view bag</span>
                    </button>
                    }

                </div>
                <div className="w-[1px] bg-gray-300 dark:bg-gray-400 h-7"></div>
                <button className="rounded-full shadow w-9 h-9 flex items-center justify-center dark:bg-white/10" type="button" onClick={handleThemeToggle}>
                    {/* {<MoonIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />} */}
                    {theme == "dark" ? <MoonIcon className="h-5 w-5 text-zinc-400 hover:text-zinc-400" aria-hidden="true" /> :
                        <SunIcon className="h-5 w-5 text-teal-600 hover:text-teal-400" aria-hidden="true" />}
                </button>

            </div>


        </div>
    )
}