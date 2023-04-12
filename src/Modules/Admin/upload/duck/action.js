import {ActionTypes} from "./type";
import Cookies from "js-cookie";
import {makeHttpRequest} from "../../../../Shared/utils/common";

export const doUploadFiles = () => {
    return async function(dispatch) {
       

    }
}

export const doSetFiles = (files) => {
    return {
        type: ActionTypes.SET_FILES,
        payload: files
    }
}

export const doSetFilesEditable = (files) => {
    return {
        type: ActionTypes.SET_FILES_EDITABLE,
        payload: files
    }
}

export const doSetSelected = (selectedFiles) => {
    return {
        type: ActionTypes.SET_SELECTED_FILES,
        payload: selectedFiles
    }
}

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





