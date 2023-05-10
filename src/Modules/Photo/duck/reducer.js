import { ActionTypes } from "./type";

const initialState = {
    purchase: {
        success: false,
        loading: false,
        error: null,
        data: null
    }
};

export const PhotoDetailReducer = (state = initialState, action) => {
    switch (action.type) {

        //fetch HOME
        case ActionTypes.PURCHASE_MEDIA_REQUEST:
            return {
                ...state,
                purchase: {
                    ...state.purchase,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.PURCHASE_MEDIA_SUCCESS:
            return {
                ...state,
                purchase: {
                    ...state.purchase,
                    success: true,
                    loading: false,
                    data: action.payload
                }
            }
        case ActionTypes.PURCHASE_MEDIA_ERROR:
            return {
                ...state,
                purchase: {
                    ...state.purchase,
                    success: false,
                    loading: false,
                    error: action.payload
                }
            }

        default:
            return state

    }
}

