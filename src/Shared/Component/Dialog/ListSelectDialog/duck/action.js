import {ActionTypes} from "./type";
import {makeJavolinRequest} from "../../../../Utils/common";

export const getData = (config) => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.REQUEST_FETCH });
        makeJavolinRequest({
            path: config.link,
            method: "GET",
            query: config.query
        },{
            SUCCESS: ActionTypes.FETCH_SUCCESS,
            ERROR: ActionTypes.FETCH_ERROR
        },dispatch);
    }
}