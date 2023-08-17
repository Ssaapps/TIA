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
        if (loginState.forgetPassword.loginSuccess) {
            setMessage("Account created successfully")
        }

        if (loginState.forgetPassword.errorMessage) {
            setError(loginState.forgetPassword.errorMessage)
        }

        console.log(loginState)
    }, [loginState])



    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <SuccessAlert open={!!message} message={message} onClose={() => { }} />

                <ErrorAlert open={error != null}
                            message={error}
                            timeout={4000}
                            onClose={() => { setError(null) }}
                />


                <div className="w-full max-w-md space-y-8">
                    <div>
                        <div className={"flex items-center justify-center"}>
                            <img src={"/logo-fav.JPG"} className={"w-20 rounded-full"} />
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Enter your email address
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            An password reset link will be sent  your email address
                        </p>
                    </div>
                    <div className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={handleChanges}
                                    required
                                    className="relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                        </div>



                        <div>
                            <JavButton onClick={onForgotPasswordClicked} isLoading={loginState.forgetPassword.loading} className={"text-white w-full bg-blue-600"}>Sign In</JavButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
