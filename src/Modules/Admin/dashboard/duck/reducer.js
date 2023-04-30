import { ActionTypes } from "./type";

const initialState = {
    fetch: {
        success: false,
        loading: false,
        error: null,
        data: null
    }
};

export const DashboardReducer = (state = initialState, action) => {
    switch (action.type) {

        //fetch DASHBOARDS
        case ActionTypes.FETCH_DASHBOARDS_REQUEST:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.FETCH_DASHBOARDS_SUCCESS:
            return {
                ...state,
                fetch: {
                    ...state.fetch,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.FETCH_DASHBOARDS_ERROR:
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

