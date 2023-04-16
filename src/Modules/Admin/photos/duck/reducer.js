import { ActionTypes } from "./type";

const initialState = {
    fetch: {
        success: false,
        loading: false,
        error: null,
        data: []
    },
    delete: {
        success: false,
        loading: false,
        error: null,
        data: null
    },
    create: {
        success: false,
        loading: false,
        error: null,
        data: null
    }
};

export const MediaReducer = (state = initialState, action) => {
    switch (action.type) {

        //fetch MEDIA
        case ActionTypes.FETCH_MEDIA_REQUEST:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    loading: true,
                    success: false,
                    error: null
                },
                delete: {
                    ...initialState.delete
                }
            }
        case ActionTypes.FETCH_MEDIA_SUCCESS:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.FETCH_MEDIA_ERROR:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }

        //create media
        case ActionTypes.CREATE_MEDIA_REQUEST:
            return {
                ...state,
                create: {
                    ...state.create,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.CREATE_MEDIA_SUCCESS:
            return {
                ...state,
                create: {
                    ...state.create,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.CREATE_MEDIA_ERROR:
            return {
                ...state,
                create: {
                    ...state.create,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }

        //delete media
        case ActionTypes.DELETE_MEDIA_REQUEST:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.DELETE_MEDIA_SUCCESS:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.DELETE_MEDIA_ERROR:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }


        default:
            return state

    }
}

