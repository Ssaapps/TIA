import { ActionTypes } from "./type";
import Cookies from "js-cookie";
import Axios from "../../../Shared/utils/axios_instance";


export const addItemToCart = (item) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.CART_ADD, payload: item });

    }
}
export const removeItemFromCart = (item) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.CART_REMOVE, payload: item });
    }
}

