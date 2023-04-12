import {ActionTypes} from "./type";

const initial = {
    fetch: {
        success: false,
        loading: false,
        error: null,
        data: null
    },
    adding: {
        success: false,
        loading: false,
        error: null
    },
    delete: {
        success: false,
        loading: false,
        error: null
    },
    stats: {
        success: false,
        loading: false,
        error: null
    }
};
export const TableReducer = (state = initial,action) => {
    switch (action.type) {

        //add
        case ActionTypes.REQUEST_ADD:
            return {
                ...state,
                adding: {
                    ...state.adding,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.ADD_SUCCESS:
            return {
                ...state,
                adding: {
                    ...state.adding,
                    success: true,
                    loading: false
                }
            }
        case ActionTypes.ADD_ERROR:
            return {
                ...state,
                adding: {
                    ...state.adding,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }


        //fetch
        case ActionTypes.REQUEST_FETCH:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    loading: true,
                    success: false,
                    error: null,
                    data: null
                },
                delete: initial.delete
            }
        case ActionTypes.FETCH_SUCCESS:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    success: true,
                    loading: false,
                    data: action.payload,
                    [action.tag]: action.payload
                },
                delete: initial.delete
            }
        case ActionTypes.FETCH_ERROR:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    success: false,
                    loading: false,
                    error: action.payload
                },
                delete: initial.delete

            }


        //delete
        case ActionTypes.REQUEST_DELETE:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.DELETE_SUCCESS:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.DELETE_ERROR:
            return {
                ...state,
                delete: {
                    ...state.delete,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }

        //stats
        case ActionTypes.REQUEST_STATS:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.STATS_SUCCESS:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.STATS_ERROR:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }


        default:
            return state

    }
}

