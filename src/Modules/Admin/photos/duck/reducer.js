import { ActionTypes } from "./type";

const initialState = {
    fetch: {
        success: false,
        loading: false,
        error: null,
        data: []
    },
    featuring: {
        success: false,
        loading: false,
        error: null,
        data: null,
    },
    setAlbumCover: {
        success: false,
        loading: false,
        error: null,
        data: null,
    },
    show: {
        success: false,
        loading: false,
        error: null,
        data: null
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

        //show MEDIA
        case ActionTypes.FETCH_MEDIA_DETAILS_REQUEST_1:
            return {
                ...state,
                show: {
                    ...state.show,
                    loading: true,
                    success: false,
                    error: null
                },
                delete: {
                    ...initialState.delete
                }
            }
        case ActionTypes.FETCH_MEDIA_DETAILS_SUCCESS_1:
            return {
                ...state,
                show: {
                    ...state.show,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.FETCH_MEDIA_DETAILS_ERROR_1:
            return {
                ...state,
                show: {
                    ...state.show,
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

        case ActionTypes.FEATURE_MEDIA_REQUEST:
            return {
                ...state,
                featuring: {
                    ...state.featuring,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.FEATURE_MEDIA_SUCCESS:
            return {
                ...state,
                featuring: {
                    ...state.featuring,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.FEATURE_MEDIA_ERROR:
            return {
                ...state,
                featuring: {
                    ...state.featuring,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }
        case ActionTypes.SET_ALBUM_COVER_REQUEST:
            return {
                ...state,
                setAlbumCover: {
                    ...state.setAlbumCover,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.SET_ALBUM_COVER_SUCCESS:
            return {
                ...state,
                setAlbumCover: {
                    ...state.setAlbumCover,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.SET_ALBUM_COVER_ERROR:
            return {
                ...state,
                setAlbumCover: {
                    ...state.setAlbumCover,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }


        default:
            return state

    }
}

