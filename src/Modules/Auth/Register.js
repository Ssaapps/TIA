import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { register } from "./duck/action";
import { useEffect, useState } from "react";
import SuccessAlert from "../../Shared/Component/Alert/Success";
import ErrorAlert from "../../Shared/Component/Alert/Error";
import JavButton from "../../Shared/Component/Buttons/JavButton";


export default function Register() {
    const loginState = useSelector(state => state.login)
    const [registerSucess, setRegisterSuccess] = useState(null)
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const [form,setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onRegisterClicked = () => {
        dispatch(register(form.name, form.email, form.password, () => {
            // window.location.replace("/login")
            setTimeout(() => {
                window.history.back();
            }, [2000])
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
        if (loginState.register.loginSuccess) {
            setRegisterSuccess("Account created successfully")
        }

        if (loginState.register.errorMessage) {
            setError(loginState.register.errorMessage)
        }

        console.log(loginState)
    }, [loginState])
    return (

            <div className="bg-[#F4F4F4] h-screen">

                <SuccessAlert open={!!registerSucess} message={registerSucess} onClose={() => { }} />

                <ErrorAlert open={error != null}
                            message={error}
                            timeout={4000}
                            onClose={() => { setError(null) }}
                />

                <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className={"flex items-center justify-center"}>
                        <img src={"/logo-fav.JPG"} className={"w-20 rounded-full"} />
                    </div>
                    <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="space-y-6">
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
                                            onChange={handleChanges}
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
                                            onChange={handleChanges}
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
                                <div>
                                    <JavButton onClick={onRegisterClicked} isLoading={loginState.register.loading} className={"text-white bg-blue-600 w-full"}>
                                        Register
                                    </JavButton>
                                </div>
                            </div>

                        </div>
                        <div className={"mt-2"}>
                            <span className={"text-sm"}>Already have an account ? <a className={"font-proximaBold underline text-blue-800"} href={"/login"}>Login</a></span>
                        </div>
                    </div>

                </div>
            </div>
    )
}
