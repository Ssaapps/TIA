import { ActionTypes } from "./type";
import Cookies from "js-cookie";

const initialState = {
    login: {
        success: false,
        loading: false,
        error: null,
        data: null,
        token: localStorage.getItem("token") && JSON.parse(localStorage.getItem("token")),
        user: localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))
    },
    register: {
        success: false,
        loading: false,
        error: null,
        data: null
    },
    forgetPassword: {
        success: false,
        loading: false,
        error: null,
        data: null
    },
    setPassword: {
        success: false,
        loading: false,
        error: null,
        data: null
    }
}
export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.REQUEST_LOGIN:
            return {
                ...initialState,
                login: {
                    ...state.login,
                    loading: true,
                    errorMessage: null,
                    loginSuccess: false
                }
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    loginSuccess: true,
                    errorMessage: null,
                    user: action?.payload?.user,
                    token: action?.payload?.token,
                }
            }
        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                login: {
                    ...state.login,
                    loading: false,
                    errorMessage: action?.payload
                }
            }


        case ActionTypes.REQUEST_REGISTER:
            return {
                ...initialState,
                register: {
                    ...state.register,
                    loading: true,
                    errorMessage: null,
                    loginSuccess: false
                }
            }
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                register: {
                    ...state.register,
                    loading: false,
                    loginSuccess: true,
                    errorMessage: null,
                    user: action.payload.user,
                    token: action?.payload?.token,
                }
            }
        case ActionTypes.REGISTER_ERROR:
            return {
                ...state,
                register: {
                    ...state.register,
                    loading: false,
                    errorMessage: action.payload
                }
            }

        case ActionTypes.REQUEST_FORGOT_PASSWORD:
            return {
                ...initialState,
                forgetPassword: {
                    ...state.forgetPassword,
                    loading: true,
                    errorMessage: null,
                    loginSuccess: false
                }
            }
        case ActionTypes.SUCCESS_FORGOT_PASSWORD:
            return {
                ...state,
                forgetPassword: {
                    ...state.forgetPassword,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.ERROR_FORGOT_PASSWORD:
            return {
                ...state,
                forgetPassword: {
                    ...state.forgetPassword,
                    loading: false,
                    errorMessage: action.payload,
                }
            }

        case ActionTypes.REQUEST_SET_PASSWORD:
            return {
                ...initialState,
                setPassword: {
                    ...state.setPassword,
                    loading: true,
                    errorMessage: null,
                    loginSuccess: false
                }
            }
        case ActionTypes.SUCCESS_SET_PASSWORD:
            return {
                ...state,
                setPassword: {
                    ...state.setPassword,
                    loading: false,
                    data: action.payload,
                    success: true
                }
            }
        case ActionTypes.ERROR_SET_PASSWORD:
            return {
                ...state,
                setPassword: {
                    ...state.setPassword,
                    loading: false,
                    errorMessage: action.payload,
                }
            }





        case ActionTypes.LOGOUT:
            return {
                ...state,
                login: {
                    ...state.login,
                    user: null,
                    token: null
                }
            }
        default:
            return state

    }
}

