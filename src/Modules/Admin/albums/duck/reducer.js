import { ActionTypes } from "./type";

const initialState = {
    fetch: {
        success: false,
        loading: false,
        error: null,
        data: []
    },
    show: {
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
    },
    delete: {
        success: false,
        loading: false,
        error: null,
    },
    edit: {
        success: false,
        loading: false,
        error: null,
    },
    share: {
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
                ...initialState,
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


        //show ALBUM
        case ActionTypes.FETCH_ALBUM_REQUEST:
            return {
                ...state,
                show: {
                    ...state.show,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.FETCH_ALBUM_SUCCESS:
            return {
                ...state,
                show: {
                    ...state.show,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.FETCH_ALBUM_ERROR:
            return {
                ...state,
                show: {
                    ...state.show,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }

        //delete album
        case ActionTypes.DELETE_ALBUM_REQUEST:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.DELETE_ALBUM_SUCCESS:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    success: true,
                    loading: false,
                }
            }
        case ActionTypes.DELETE_ALBUM_ERROR:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }

        //create ALBUM
        case ActionTypes.SHARE_ALBUM_REQUEST:
            return {
                ...state,
                share: {
                    ...state.share,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.SHARE_ALBUM_SUCCESS:
            return {
                ...state,
                share: {
                    ...state.share,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.SHARE_ALBUM_ERROR:
            return {
                ...state,
                share: {
                    ...state.share,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }


        //edit album
        case ActionTypes.EDIT_ALBUMS_REQUEST:
            return {
                ...state,
                edit: {
                    ...state.edit,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.EDIT_ALBUMS_SUCCESS:
            return {
                ...state,
                edit: {
                    ...state.edit,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.EDIT_ALBUMS_ERROR:
            return {
                ...state,
                edit: {
                    ...state.edit,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }



        default:
            return state

    }
}

