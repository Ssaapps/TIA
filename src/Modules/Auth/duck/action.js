import { ActionTypes } from "./type";
import Cookies from "js-cookie";
// import { makeJavolinRequest } from "../../../Shared/Utils/common";
import Axios from "../../../Shared/utils/axios_instance";


export const login = (email, password) => {
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
                dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: response.data });
            }
            // window.location.reload();
        }
        catch (e) {
            console.log(e)
            let errMsg = 'Something went wrong';
            if (e.response) {
                errMsg = e.response.data.message
            }
            dispatch({ type: ActionTypes.LOGIN_ERROR, payload: errMsg });
        }

    }
}

export const register = (name, email, password) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.REQUEST_REGISTER });

        try {
            const response = await Axios.post("/user/register", {
                name: name,
                email: email,
                password: password
            })

            console.log(response.data)
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