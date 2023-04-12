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

export const OrdersReducer = (state = initialState, action) => {
    switch (action.type) {

        //fetch GROUPS
        case ActionTypes.FETCH_GROUPS_REQUEST:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.FETCH_GROUPS_SUCCESS:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.FETCH_GROUPS_ERROR:
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
        case ActionTypes.CREATE_GROUPS_REQUEST:
            return {
                ...state,
                create: {
                    ...state.create,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.CREATE_GROUPS_SUCCESS:
            return {
                ...state,
                create: {
                    ...state.create,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.CREATE_GROUPS_ERROR:
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

