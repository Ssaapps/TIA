import { ActionTypes } from "./type";
import Cookies from "js-cookie";
import Axios from "../../../Shared/utils/axios_instance";
import {makeHttpRequest} from "../../../Shared/utils/common";


export const login = (email, password, callback) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.REQUEST_LOGIN });
        try {
            const response = await Axios.post("/user/login", {
                email: email,
                password: password
            })
            console.log(response.data)
            if (response && response.data) {
                localStorage.setItem("token", JSON.stringify(response.data.token))
                localStorage.setItem("user", JSON.stringify(response.data.user))
                callback()
                dispatch({
                    type: ActionTypes.LOGIN_SUCCESS, payload: {
                        token: response.data.token,
                        user: response.data.user
                    }
                });
            }
            // window.location.reload();
        }
        catch (e) {
            let errMsg = 'Something went wrong';
            if (e.response) {
                errMsg = e.response.data.message
            }
            console.log(e.response.data.message)
            dispatch({ type: ActionTypes.LOGIN_ERROR, payload: errMsg });
        }

    }
}

export const register = (name, email, password, callback) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.REQUEST_REGISTER });

        try {
            const response = await Axios.post("/user/register", {
                name: name,
                email: email,
                password: password
            })

            console.log(response.data)
            callback()
            dispatch({ type: ActionTypes.REGISTER_SUCCESS, payload: response.data });
        } catch (e) {
            console.log(e)
            let errMsg = 'Something went wrong';
            if (e.response) {
                errMsg = e.response.data.message
            }
            dispatch({ type: ActionTypes.REGISTER_ERROR, payload: errMsg });
        }

    }

}


export const forgotPassword = (email) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.REQUEST_FORGOT_PASSWORD });
        makeHttpRequest({
            path: `user/password/forgot`,
            method: "POST",
            data: {email}
        }, {
            SUCCESS: ActionTypes.SUCCESS_FORGOT_PASSWORD,
            ERROR: ActionTypes.ERROR_FORGOT_PASSWORD
        }, dispatch);

    }

}

export const setPassword = (data) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.REQUEST_SET_PASSWORD });
        makeHttpRequest({
            path: `user/password/forgot/set`,
            method: "POST",
            data: data
        }, {
            SUCCESS: ActionTypes.SUCCESS_SET_PASSWORD,
            ERROR: ActionTypes.ERROR_SET_PASSWORD
        }, dispatch);

    }

}


export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.LOGOUT })
        //Local Storage should be cleared but token used in axios instance is not cleared
        localStorage.clear();
        Cookies.remove("javAdminAccessToken");
        Cookies.remove("javAdmin");
        window.location.reload();
    }
}