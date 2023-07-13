import { ActionTypes } from "./type";

const initialState = {
    fetch: {
        success: false,
        loading: false,
        error: null,
        data: null
    }

};

export const HomeReducer = (state = initialState, action) => {
    switch (action.type) {

        //fetch HOME
        case ActionTypes.FETCH_HOME_REQUEST:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.FETCH_HOME_SUCCESS:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.FETCH_HOME_ERROR:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }

        default:
            return state

    }
}

