import {ActionTypes} from "./type";
import {makeHttpRequest} from "../../../../Shared/utils/common";

export const getOrders = () => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.FETCH_ORDERS_REQUEST });
        makeHttpRequest({
            path: `admin/orders`,
            method: "GET",
        },{
            SUCCESS: ActionTypes.FETCH_ORDERS_SUCCESS,
            ERROR: ActionTypes.FETCH_ORDERS_ERROR
        },dispatch);
    }
}

export const createGroup = (data) => {
    return async function(dispatch) {
        dispatch({ type: ActionTypes.CREATE_ORDERS_REQUEST });
        makeHttpRequest({
            path: `admin/orders`,
            method: "POST",
            data: data
        },{
            SUCCESS: ActionTypes.CREATE_ORDERS_SUCCESS,
            ERROR: ActionTypes.CREATE_ORDERS_ERROR
        },dispatch);
    }
}





