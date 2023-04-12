import {ActionTypes} from "./type";
import {makeHttpRequest} from "../../../../Shared/utils/common";

export const getAlbums = () => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.FETCH_ALBUMS_REQUEST });
        makeHttpRequest({
            path: `albums`,
            method: "GET",
        },{
            SUCCESS: ActionTypes.FETCH_ALBUMS_SUCCESS,
            ERROR: ActionTypes.FETCH_ALBUMS_ERROR
        },dispatch);
    }
}

export const createAlbum = (data) => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.CREATE_ALBUMS_REQUEST });
        makeHttpRequest({
            path: `albums`,
            method: "POST",
            data: data
        },{
            SUCCESS: ActionTypes.CREATE_ALBUMS_SUCCESS,
            ERROR: ActionTypes.CREATE_ALBUMS_ERROR
        },dispatch);
    }
}





