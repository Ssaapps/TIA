import { ActionTypes } from "./type";
import { makeHttpRequest } from "../../../../Shared/utils/common";

export const getSettings = () => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.FETCH_SETTINGS_REQUEST });
        makeHttpRequest({
            path: `admin/settings`,
            method: "GET",
        }, {
            SUCCESS: ActionTypes.FETCH_SETTINGS_SUCCESS,
            ERROR: ActionTypes.FETCH_SETTINGS_ERROR
        }, dispatch);
    }
}

export const editBannerSettings = (data) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.EDIT_BANNER_REQUEST });
        makeHttpRequest({
            path: `admin/settings/2`,
            method: "PUT",
            data: data
        }, {
            SUCCESS: ActionTypes.EDIT_BANNER_SUCCESS,
            ERROR: ActionTypes.EDIT_BANNER_ERROR
        }, dispatch);
    }
}








