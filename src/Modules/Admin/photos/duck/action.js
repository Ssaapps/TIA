import { ActionTypes } from "./type";
import { makeHttpRequest } from "../../../../Shared/utils/common";

export const getMedia = (album) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.FETCH_MEDIA_REQUEST });
        makeHttpRequest({
            path: `admin/media`,
            method: "GET",
            query: { album }
        }, {
            SUCCESS: ActionTypes.FETCH_MEDIA_SUCCESS,
            ERROR: ActionTypes.FETCH_MEDIA_ERROR
        }, dispatch);
    }
}

export const getMediaDetails = (id) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.FETCH_MEDIA_DETAILS_REQUEST_1 });
        makeHttpRequest({
            path: `media/${id}`,
            method: "GET",
        }, {
            SUCCESS: ActionTypes.FETCH_MEDIA_DETAILS_SUCCESS_1,
            ERROR: ActionTypes.FETCH_MEDIA_DETAILS_ERROR_1
        }, dispatch);
    }
}

export const setAlbumCover = (id, onSuccess, onError) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.SET_ALBUM_COVER_REQUEST });
        makeHttpRequest({
            path: `admin/media/${id}/set_as_cover`,
            method: "POST",
        }, {
            SUCCESS: ActionTypes.SET_ALBUM_COVER_SUCCESS,
            ERROR: ActionTypes.SET_ALBUM_COVER_ERROR
        }, dispatch, onSuccess, onError);
    }
}



export const deleteMedia = (id) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.DELETE_MEDIA_REQUEST });
        makeHttpRequest({
            path: `admin/media/${id}`,
            method: "DELETE"
        }, {
            SUCCESS: ActionTypes.DELETE_MEDIA_SUCCESS,
            ERROR: ActionTypes.DELETE_MEDIA_ERROR
        }, dispatch);
    }
}

export const featureMedia = (id, onSuccess, onError) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.FEATURE_MEDIA_REQUEST });
        makeHttpRequest({
            path: `admin/media/feature`,
            method: "POST",
            data: {
                id: id

            }
        }, {
            SUCCESS: ActionTypes.FEATURE_MEDIA_SUCCESS,
            ERROR: ActionTypes.FEATURE_MEDIA_ERROR
        }, dispatch, onSuccess, onError);
    }
}



export const createAlbum = (data) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.CREATE_MEDIA_REQUEST });
        makeHttpRequest({
            path: `admin/media`,
            method: "POST",
            data: data
        }, {
            SUCCESS: ActionTypes.CREATE_MEDIA_SUCCESS,
            ERROR: ActionTypes.CREATE_MEDIA_ERROR
        }, dispatch);
    }
}





