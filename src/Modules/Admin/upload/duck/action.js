import {ActionTypes} from "./type";
import Cookies from "js-cookie";

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

