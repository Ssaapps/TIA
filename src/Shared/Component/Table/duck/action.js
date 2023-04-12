import {ActionTypes} from "./type";
import {makeHttpRequest} from "../../../utils/common";


export const getDataForTable = (config,tag) => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.REQUEST_FETCH,tag});
        makeHttpRequest({
            path: config.link,
            method: "GET",
            query: {
                paginate: true,
                per_page: config.pageSize,
                page: config.page
            }
        },{
            SUCCESS: ActionTypes.FETCH_SUCCESS,
            ERROR: ActionTypes.FETCH_ERROR
        },dispatch,null,null,tag);
    }
}

export const getData = (config) => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.REQUEST_FETCH });
        makeHttpRequest({
            path: config.link,
            method: "GET",
            query: config.query
        },{
            SUCCESS: ActionTypes.FETCH_SUCCESS,
            ERROR: ActionTypes.FETCH_ERROR
        },dispatch);
    }
}