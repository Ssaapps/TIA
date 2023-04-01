import {ActionTypes} from "./type";
import Cookies from "js-cookie";
import {makeJavolinRequest} from "../../../Shared/Utils/common";


export const login = (email,password) => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.REQUEST_LOGIN });
        makeJavolinRequest({
            path: "admin/login",
            method: "POST",
            data: {
                email: email,
                password: password
            }
        },{
            SUCCESS: ActionTypes.LOGIN_SUCCESS,
            ERROR: ActionTypes.LOGIN_ERROR
        },dispatch,(data) => {
            if (data && data.token) {
                Cookies.set("javAdminAccessToken", data.token.access_token, {
                    expires: 7,
                });
                Cookies.set("javAdmin", JSON.stringify(data.user), {
                    expires: 7,
                });
                Cookies.set("javPermissions", JSON.stringify(data.permissions.map(item => {
                    return item.name
                })), {
                    expires: 7,
                });
            }
        })


    }
}

export const logout = () => {
    return async (dispatch) => {
        Cookies.remove("javAdminAccessToken");
        Cookies.remove("javAdmin");
        window.location.reload();
    }
}