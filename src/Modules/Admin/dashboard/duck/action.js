import {ActionTypes} from "./type";
import {makeHttpRequest} from "../../../../Shared/utils/common";

export const getDashboard = () => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.FETCH_DASHBOARDS_REQUEST });
        makeHttpRequest({
            path: `admin/dashboard`,
            method: "GET",
        },{
            SUCCESS: ActionTypes.FETCH_DASHBOARDS_SUCCESS,
            ERROR: ActionTypes.FETCH_DASHBOARDS_ERROR
        },dispatch);
    }
}






