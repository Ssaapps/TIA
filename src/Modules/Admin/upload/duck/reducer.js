import { ActionTypes } from "./type";
import Cookies from "js-cookie";

export const UploadReducer = (state = {
    errorMessage: null,
    uploadSuccess: false,
    isLoading: false,
    files: [],
    filesEditable: [],
    selected: [],
}, action) => {
    switch (action.type) {
        case ActionTypes.SET_FILES:
            return { ...state, files: action.payload }

        case ActionTypes.SET_SELECTED_FILES:
            return { ...state, selected: action.payload }

        case ActionTypes.SET_FILES_EDITABLE:
            return { ...state, filesEditable: action.payload }

        default:
            return state

    }
}

