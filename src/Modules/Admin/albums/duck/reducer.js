import { ActionTypes } from "./type";

const initialState = {
    fetch: {
        success: false,
        loading: false,
        error: null,
        data: []
    },
    create: {
        success: false,
        loading: false,
        error: null,
        data: null
    }
};

export const AlbumReducer = (state = initialState, action) => {
    switch (action.type) {

        //fetch ALBUMS
        case ActionTypes.FETCH_ALBUMS_REQUEST:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.FETCH_ALBUMS_SUCCESS:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.FETCH_ALBUMS_ERROR:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }

        //create ALBUM
        case ActionTypes.CREATE_ALBUMS_REQUEST:
            return {
                ...state,
                create: {
                    ...state.create,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.CREATE_ALBUMS_SUCCESS:
            return {
                ...state,
                create: {
                    ...state.create,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.CREATE_ALBUMS_ERROR:
            return {
                ...state,
                create: {
                    ...state.create,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }


        default:
            return state

    }
}

