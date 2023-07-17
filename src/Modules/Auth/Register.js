import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { PropagateLoader } from "react-spinners";
import CustomLoadingOverlay from "../../Shared/Component/CustomLoadingOverlay";
import ErrorNotification from "../../Shared/Component/ErrorNotification";
import Logo from "../../Shared/Component/Icons/Logo";
import { register } from "./duck/action";
import { useEffect, useState } from "react";
import SuccessAlert from "../../Shared/Component/Alert/Success";
import ErrorAlert from "../../Shared/Component/Alert/Error";


export default function Register() {
    const loginState = useSelector(state => state.login)
    const [registerSucess, setRegisterSuccess] = useState(null)
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const handleSubmit = (e) => {
        e.preventDefault();
        //Dispatch login action
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        dispatch(register(name, email, password, () => {
            window.location.replace("/login")
        }))
    }


    useEffect(() => {
        if (loginState.register.loginSuccess) {
            setRegisterSuccess("Account created successfully")
            setTimeout(() => {
                window.history.back();
            }, [1000])
        }

        if (loginState.register.errorMessage) {
            setError(loginState.register.errorMessage)
        }

        console.log(loginState)
    }, [loginState])
    return (

        <CustomLoadingOverlay spinner={<PropagateLoader color="#fff" />} text={""} show={loginState.register.isLoading} >
            <SuccessAlert open={!!registerSucess} message={registerSucess} onClose={() => { }} />

            <ErrorAlert open={error != null}
                message={error}
                timeout={4000}
                onClose={() => { setError(null) }}
            />

            <div className="bg-[#F4F4F4] h-screen">

                <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className={"flex items-center justify-center"}>
                        <img src={"/logo-fav.JPG"} className={"w-20 rounded-full"} />
                    </div>
                    <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <h6>Register an account</h6>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>


                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
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
                                            autoComplete="current-password"
                                            required
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                {/* <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            id="remember-me"
                                            name="remember-me"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Forgot your password?
                                        </a>
                                    </div>
                                </div> */}
                                <div>
                                    <button
                                        type="submit"
                                        className="flex w-full justify-center rounded-md border border-transparent bg-[#ef3f23] py-2 px-4 text-sm font-medium text-white shadow-sm bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>

                        </div>
                        <div className={"mt-2"}>
                            <span className={"text-sm"}>Already have an account ? <a className={"font-proximaBold underline text-blue-800"} href={"/login"}>Login</a></span>
                        </div>
                    </div>

                </div>
            </div>
            {loginState.register.error && <ErrorNotification errorMessage={loginState.register.error} />}
        </CustomLoadingOverlay>
    )
}
