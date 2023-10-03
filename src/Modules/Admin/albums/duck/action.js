import { ActionTypes } from "./type";
import { makeHttpRequest } from "../../../../Shared/utils/common";

export const getAlbums = () => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.FETCH_ALBUMS_REQUEST });
        makeHttpRequest({
            path: `admin/albums`,
            method: "GET",

        }, {
            SUCCESS: ActionTypes.FETCH_ALBUMS_SUCCESS,
            ERROR: ActionTypes.FETCH_ALBUMS_ERROR
        }, dispatch);
    }
}


export const getLastReload = () => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.LAST_RELOAD_REQUEST });
        makeHttpRequest({
            path: `newsbridge`,
            method: "GET",
        }, {
            SUCCESS: ActionTypes.LAST_RELOAD_SUCCESS,
            ERROR: ActionTypes.LAST_RELOAD_ERROR
        }, dispatch);
    }
}

export const doReload = () => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.LAST_RELOAD_RELOAD_REQUEST });
        makeHttpRequest({
            path: `newsbridge`,
            method: "POST",
        }, {
            SUCCESS: ActionTypes.LAST_RELOAD_RELOAD_SUCCESS,
            ERROR: ActionTypes.LAST_RELOAD_RELOAD_ERROR
        }, dispatch);
    }
}

export const deleteAlbum = (albumId, callback, errorCallback) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.DELETE_ALBUM_REQUEST });
        makeHttpRequest({
            path: `admin/albums/${albumId}`,
            method: "DELETE",
        }, {
            SUCCESS: ActionTypes.DELETE_ALBUM_SUCCESS,
            ERROR: ActionTypes.DELETE_ALBUM_ERROR
        }, dispatch, callback, errorCallback);
    }
}

export const getAlbum = (id) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.FETCH_ALBUM_REQUEST });
        makeHttpRequest({
            path: `admin/albums/${id}`,
            method: "GET",
        }, {
            SUCCESS: ActionTypes.FETCH_ALBUM_SUCCESS,
            ERROR: ActionTypes.FETCH_ALBUM_ERROR
        }, dispatch);
    }
}
export const shareAlbum = (id) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.SHARE_ALBUM_REQUEST });
        makeHttpRequest({
            path: ` /api/album/${id}/share`,
            method: "POST",
        }, {
            SUCCESS: ActionTypes.SHARE_ALBUM_SUCCESS,
            ERROR: ActionTypes.SHARE_ALBUM_ERROR
        }, dispatch);
    }
}

export const createAlbum = (data) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.CREATE_ALBUMS_REQUEST });
        makeHttpRequest({
            path: `admin/albums`,
            method: "POST",
            data: data
        }, {
            SUCCESS: ActionTypes.CREATE_ALBUMS_SUCCESS,
            ERROR: ActionTypes.CREATE_ALBUMS_ERROR
        }, dispatch);
    }
}

export const editAlbum = (id, data) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.EDIT_ALBUMS_REQUEST });
        makeHttpRequest({
            path: `admin/albums/${id}`,
            method: "PUT",
            data: data
        }, {
            SUCCESS: ActionTypes.EDIT_ALBUMS_SUCCESS,
            ERROR: ActionTypes.EDIT_ALBUMS_ERROR
        }, dispatch);
    }
}





