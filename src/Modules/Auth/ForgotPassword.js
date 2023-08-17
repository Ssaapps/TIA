import JavButton from "../../Shared/Component/Buttons/JavButton";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {forgotPassword} from "./duck/action";
import SuccessAlert from "../../Shared/Component/Alert/Success";
import ErrorAlert from "../../Shared/Component/Alert/Error";

export default function ForgotPassword() {

    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const [form,setForm] = useState({
        email: "",
    });
    const loginState = useSelector(state => state.login);


    const handleChanges = (event) => {
        const value = event.target.value;
        setForm({
            ...form,
            [event.target.name]: value
        })
    }

    const onForgotPasswordClicked = () => {
        dispatch(forgotPassword(form));
    }

    useEffect(() => {
        if (loginState.forgetPassword.success) {
            setMessage("Password reset Link to your Mail")
            setTimeout(() => {
                window.location.href = "/login";
            },2000)
        }

        if (loginState.forgetPassword.errorMessage) {
            setError(loginState.forgetPassword.errorMessage)
        }

        console.log(loginState)
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
                            <h6 className={"font-proximaBold text-2xl text-blue-800"}>Forgot Password.</h6>
                            <span className={"text-xs leading-tight text-gray-600"}>Provide the email on your account and we’ll send detals to reset your password</span>
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
                                <JavButton onClick={onForgotPasswordClicked} isLoading={loginState.forgetPassword.loading} className={"text-white bg-blue-600 w-full"}>
                                    Reset Password
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
