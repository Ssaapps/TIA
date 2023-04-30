import {ActionTypes} from "./type";
import {makeHttpRequest} from "../../../Shared/utils/common";

export const getHome = () => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.FETCH_HOME_REQUEST });
        makeHttpRequest({
            path: `home`,
            method: "GET",
        },{
            SUCCESS: ActionTypes.FETCH_HOME_SUCCESS,
            ERROR: ActionTypes.FETCH_HOME_ERROR
        },dispatch);
    }
}






