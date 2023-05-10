import {ActionTypes} from "./type";
import Cookies from "js-cookie";

const initialState = {
    login: {
        success: false,
        loading: false,
        error: null,
        data: null,
        token: localStorage.getItem("token") && JSON.parse(localStorage.getItem("token") ),
        user: localStorage.getItem("user") && JSON.parse(localStorage.getItem("user") )
    },
    register: {
        success: false,
        loading: false,
        error: null,
        data: null
    }
}
export const LoginReducer = (state = initialState,action) => {
    switch (action.type) {




        case ActionTypes.REQUEST_LOGIN:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: true,
                    errorMessage: null,
                    loginSuccess: false
                }
            }
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: false,
                    loginSuccess: true,
                    errorMessage: null,
                    user: action.payload.user,
                    token: action.payload.token.access_token,
                }
            }
        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: false,
                    errorMessage: action.payload
                }
            }


        case ActionTypes.REQUEST_REGISTER:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: true,
                    errorMessage: null,
                    loginSuccess: false
                }
            }
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: false,
                    loginSuccess: true,
                    errorMessage: null,
                    user: action.payload.user,
                    token: action.payload.token.access_token,
                }
            }
        case ActionTypes.REGISTER_ERROR:
            return {
                ...state,
                register: {
                    ...state.register,
                    isLoading: false,
                    errorMessage: action.payload
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

