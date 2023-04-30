import {ActionTypes} from "./type";
import {makeHttpRequest} from "../../../../Shared/utils/common";

export const getGroups = () => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.FETCH_GROUPS_REQUEST });
        makeHttpRequest({
            path: `admin/groups`,
            method: "GET",
        },{
            SUCCESS: ActionTypes.FETCH_GROUPS_SUCCESS,
            ERROR: ActionTypes.FETCH_GROUPS_ERROR
        },dispatch);
    }
}

export const createGroup = (data) => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.CREATE_GROUPS_REQUEST });
        makeHttpRequest({
            path: `admin/groups`,
            method: "POST",
            data: data
        },{
            SUCCESS: ActionTypes.CREATE_GROUPS_SUCCESS,
            ERROR: ActionTypes.CREATE_GROUPS_ERROR
        },dispatch);
    }
}





