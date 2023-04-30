import {ActionTypes} from "./type";
import Cookies from "js-cookie";

export const LoginReducer = (state = {
    errorMessage: null,
    loginSuccess: false,
    isLoading: false,
    // token: Cookies.get("javAdminAccessToken"),
    // user: Cookies.get("javAdmin") && JSON.parse(Cookies.get("javAdmin") ),
    token: localStorage.getItem("token") && JSON.parse(localStorage.getItem("token") ),
    user: localStorage.getItem("user") && JSON.parse(localStorage.getItem("user") ),
    permissions: Cookies.get("javPermissions") && JSON.parse(Cookies.get("javPermissions") )
},action) => {
    switch (action.type) {
        case ActionTypes.REQUEST_LOGIN:
            return {...state,isLoading: true,errorMessage: null,loginSuccess: false}
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                loginSuccess: true,
                errorMessage: null,
                user: action.payload.user,
                token: action.payload.token.access_token,
                // permissions: action.payload.permissions
            }
        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload
            }

        case ActionTypes.LOGOUT:
            return {
                ...state,
                user: null,
                token: null
            }
        default:
            return state

    }
}

