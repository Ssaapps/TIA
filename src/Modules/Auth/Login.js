import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { login } from "./duck/action";
import {useEffect, useRef, useState} from "react";
import ErrorAlert from "../../Shared/Component/Alert/Error";
import { Link } from "react-router-dom";
import JavButton from "../../Shared/Component/Buttons/JavButton";

export default function Login() {
    const dispatch = useDispatch();
    const [authError, setAuthError] = useState(null);
    const loginState = useSelector(state => state.login);
    const navigate = useNavigate();
    const location = useLocation();
    const [form,setForm] = useState({
        email: "",
        password: ""
    });


    const onLoginClicked = () => {
        dispatch(login(form.email,form.password, () => {
            const previousPage = location.state?.from;
            if (previousPage) {
                if (previousPage.pathname === "/cart") {
                    window.location.replace("/cart")
                }
            }
            else {
                window.location.replace("/")
            }
        }))
    }

    const handleChanges = (event) => {
        const value = event.target.value;
        setForm({
            ...form,
            [event.target.name]: value
        })
    }


    useEffect(() => {
        console.log("loginState", loginState)
        if (loginState.login.loginSuccess) {

        }
    }, [loginState])


    useEffect(() => {
        const previousPage = location.state?.from;
        console.log("previousPage", previousPage);
        const error = loginState.login.errorMessage || loginState.register.errorMessage
        setAuthError(error)
    }, [loginState])


    return (

            <div className="bg-[#F4F4F4] h-screen">
                <ErrorAlert open={!!authError} message={authError} onClose={() => {
                    setAuthError(null)
                }} />
                <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className={"flex items-center justify-center"}>
                        <img src={"/logo-fav.JPG"} className={"w-20 rounded-full"} />
                    </div>
                    <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="space-y-6">
                                <h6 className={'font-proximaBold text-2xl text-blue-800'}>Sign in.</h6>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            onChange={handleChanges}
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handleChanges}
                                            autoComplete="current-password"
                                            required
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    { <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div> }
                                    <div className="text-sm">
                                        <Link to={"/forgot-password"} className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Forgot your password?
                                        </Link>
                                    </div>
                                </div>
                                <div>
                                    <JavButton onClick={onLoginClicked} isLoading={loginState.login.loading} className={"w-full text-white bg-blue-600"}>
                                        Sign in
                                    </JavButton>
                                </div>
                            </div>

                        </div>
                        <div className={"mt-2"}>
                            <span className={"text-sm"}>Don't have an account ? <a className={"cursor-pointer font-proximaBold underline text-blue-800"} onClick={() => {
                                navigate('/register', {
                                    state: { from: location }
                                });
                            }}>Create account</a></span>
                        </div>
                    </div>

                </div>
            </div>
    )
}
