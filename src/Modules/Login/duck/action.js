import { ActionTypes } from "./type";
import Cookies from "js-cookie";
// import { makeJavolinRequest } from "../../../Shared/Utils/common";
import Axios from "../../../Shared/utils/axios_instance";


export const login = (email, password) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.REQUEST_LOGIN });
        // makeJavolinRequest({
        //     path: "admin/login",
        //     method: "POST",
        //     data: {
        //         email: email,
        //         password: password
        //     }
        // },{
        //     SUCCESS: ActionTypes.LOGIN_SUCCESS,
        //     ERROR: ActionTypes.LOGIN_ERROR
        // },dispatch,(data) => {
        //     if (data && data.token) {
        //         Cookies.set("javAdminAccessToken", data.token.access_token, {
        //             expires: 7,
        //         });
        //         Cookies.set("javAdmin", JSON.stringify(data.user), {
        //             expires: 7,
        //         });
        //         Cookies.set("javPermissions", JSON.stringify(data.permissions.map(item => {
        //             return item.name
        //         })), {
        //             expires: 7,
        //         });
        //     }
        // })
        try {
            const response = await Axios.post("/user/login", {
                email: email,
                password: password
            })
            console.log(response.data)
            if (response && response.data) {
                dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: response.data });
            }
            // window.location.reload();

        }
        catch (e) {
            console.log(e)
            let errMsg = '';
            if (e.response) {
                errMsg = e.response.data.message
            }
            errMsg = "Something went wrong"
            dispatch({ type: ActionTypes.LOGIN_ERROR, payload: errMsg });
        }

    }
}

export const logout = () => {
    return async (dispatch) => {
        Cookies.remove("javAdminAccessToken");
        Cookies.remove("javAdmin");
        window.location.reload();
    }
}