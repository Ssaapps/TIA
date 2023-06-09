import { ActionTypes } from "./type";

const initialState = {
    errorMessage: null,
    uploadSuccess: false,
    isLoading: false,
    files: [],
    filesEditable: [],
    selected: [],
    uploadProgress: null,
    albums: {
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
    },
    media: {
    }
};

export const UploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_FILES:
            return { ...state, files: action.payload }

        case ActionTypes.SET_SELECTED_FILES:
            return { ...state, selected: action.payload }

        case ActionTypes.SET_FILES_EDITABLE:
            return { ...state, filesEditable: action.payload }

        case ActionTypes.GET_UPLOAD_PROGRESS:
            return { ...state, uploadProgress: action.payload }

        //fetch ALBUMS
        case ActionTypes.FETCH_ALBUMS_REQUEST:
            return {
                ...state,
                albums: {
                    ...state.albums,
                    fetch: {
                        ...state.albums.fetch,
                        loading: true,
                        success: false,
                        error: null
                    },
                    create: {
                        ...initialState.albums.create
                    }
                }

            }
        case ActionTypes.FETCH_ALBUMS_SUCCESS:
            return {
                ...state,
                albums: {
                    ...state.albums,
                    fetch: {
                        ...state.albums.fetch,
                        success: true,
                        loading: false,
                        data: action.payload
                    }
                }
            }
        case ActionTypes.FETCH_ALBUMS_ERROR:
            return {
                ...state,
                albums: {
                    ...state.albums,
                    fetch: {
                        ...state.albums.fetch,
                        success: false,
                        loading: false,
                        error: action.payload
                    }
                }
            }

        //create ALBUM
        case ActionTypes.CREATE_ALBUMS_REQUEST:
            return {
                ...state,
                albums: {
                    ...state.albums,
                    create: {
                        ...state.albums.create,
                        loading: true,
                        success: false,
                        error: null
                    }
                }

            }
        case ActionTypes.CREATE_ALBUMS_SUCCESS:
            return {
                ...state,
                albums: {
                    ...state.albums,
                    create: {
                        ...state.albums.create,
                        success: true,
                        loading: false,
                        data: action.payload
                    }
                }
            }
        case ActionTypes.CREATE_ALBUMS_ERROR:
            return {
                ...state,
                albums: {
                    ...state.albums,
                    create: {
                        ...state.albums.create,
                        success: false,
                        loading: false,
                        error: action.payload
                    }
                }
            }

        //upload MEDIA
        case ActionTypes.UPLOAD_MEDIA_REQUEST(action.id):
            return {
                ...state,
                media: {
                    ...state.media,
                    [action.id]: {
                        success: false,
                        loading: true,
                        error: null,
                        data: null
                    }
                }

            }
        case ActionTypes.UPLOAD_MEDIA_SUCCESS(action.id):
            return {
                ...state,
                media: {
                    ...state.media,
                    [action.id]: {
                        success: true,
                        loading: false,
                        error: null,
                        uploadProgress: null,
                        data: action.payload
                    }
                }
            }
        case ActionTypes.UPLOAD_MEDIA_ERROR(action.id):
            return {
                ...state,
                media: {
                    ...state.media,
                    [action.id]: {
                        success: false,
                        loading: false,
                        uploadProgress: null,
                        error: action.payload,
                        data: null
                    }
                }
            }




        default:
            return state

    }
}

