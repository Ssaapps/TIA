import { ActionTypes } from "./type";

const initialState = {
    fetch: {
        success: false,
        loading: false,
        error: null,
        data: {}
    },
    banner: {
        success: false,
        loading: false,
        error: null,
        data: null
    },

};

export const SettingsReducer = (state = initialState, action) => {
    switch (action.type) {

        //fetch SETTINGS
        case ActionTypes.FETCH_SETTINGS_REQUEST:
            return {
                ...initialState,
                fetch: {
                    ...state.fetch,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.FETCH_SETTINGS_SUCCESS:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.FETCH_SETTINGS_ERROR:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }

        case ActionTypes.EDIT_BANNER_REQUEST:
            return {
                ...state,
                banner: {
                    ...state.banner,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.EDIT_BANNER_SUCCESS:
            return {
                ...state,
                banner: {
                    ...state.banner,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.EDIT_BANNER_ERROR:
            return {
                ...state,
                banner: {
                    ...state.banner,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }








        default:
            return state

    }
}

