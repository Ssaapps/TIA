import {ActionTypes} from "./type";
import {makeHttpRequest} from "../../../Shared/utils/common";

export const purchaseMedia = (id) => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.PURCHASE_MEDIA_REQUEST });
        makeHttpRequest({
            path: `media/${id}/purchase`,
            method: "POST",
        },{
            SUCCESS: ActionTypes.PURCHASE_MEDIA_SUCCESS,
            ERROR: ActionTypes.PURCHASE_MEDIA_ERROR
        },dispatch);
    }
}






