import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setPassword} from "./duck/action";
import {useEffect, useState} from "react";
import ErrorAlert from "../../Shared/Component/Alert/Error";
import JavButton from "../../Shared/Component/Buttons/JavButton";
import SuccessAlert from "../../Shared/Component/Alert/Success";

export default function SetPassword() {
    const dispatch = useDispatch();
    const [authError, setAuthError] = useState(null);
    const loginState = useSelector(state => state.login);
    const navigate = useNavigate();
    const location = useLocation();
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null);
    const [form,setForm] = useState({
        password_confirmation: "",
        password: ""
    });

    const onSetPasswordClicked = () => {
        const queryParams = new URLSearchParams(location.search);
        const recoveryToken = queryParams.get('recovery_token');
        dispatch(setPassword({...form,recovery_token: recoveryToken}))
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
        if (loginState.setPassword.success) {
            setMessage("Password set successfully");
            setTimeout(() => {
                window.location.href = '/login';
            },3000)
        }
    }, [loginState])


    useEffect(() => {
        const previousPage = location.state?.from;
        console.log("previousPage", previousPage);
        const error = loginState.setPassword.errorMessage || loginState.setPassword.errorMessage
        setAuthError(error)
    }, [loginState])


    return (

        <div className="bg-[#F4F4F4] h-screen">


            <SuccessAlert open={!!message} message={message} onClose={() => { }} />

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
                            <h6>Set new Password</h6>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChanges}
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        type="password"
                                        onChange={handleChanges}
                                        autoComplete="current-password"
                                        required
                                        className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <JavButton onClick={onSetPasswordClicked} isLoading={loginState.setPassword.loading} className={"w-full text-white bg-blue-600"}>
                                    Set new Password
                                </JavButton>
                            </div>
                        </div>

                    </div>
                    <div className={"mt-2"}>
                            <span className={"text-sm"}>Already have an account ? <a className={"font-proximaBold underline text-blue-800"} onClick={() => {
                                navigate('/login', {
                                    state: { from: location }
                                });
                            }}>Sign In</a></span>
                    </div>
                </div>

            </div>
        </div>
    )
}
