import { ActionTypes } from "./type";
import Cookies from "js-cookie";
import Axios from "../../../Shared/utils/axios_instance";


export const addItemToCart = (item) => {
    return async function (dispatch) {
        let tempCart = []
        const rawCart = localStorage.getItem("cart")
        if (rawCart) {
            const items = JSON.parse(rawCart)
            tempCart = items.find((cartItem) => cartItem.id === item.id) ? [...items] : [...items, item]
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
        else {
            tempCart.push(item)
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
        dispatch({ type: ActionTypes.CART_ADD, payload: item });
    }
}
export const removeItemFromCart = (item) => {
    return async function (dispatch) {
        let tempCart = []
        const rawCart = localStorage.getItem("cart")
        if (rawCart) {
            tempCart = JSON.parse(rawCart)
            tempCart = tempCart.filter((cartItem) => cartItem.id !== item.id)
        }
        dispatch({ type: ActionTypes.CART_REMOVE, payload: item });
    }
}



export const checkout = (cartItems, callback) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.CHECKOUT_REQUEST });
        try {
            const response = await Axios.post("/orders", {
                albums: cartItems.map((item) => item.id)
            })
            console.log(response.data)
            if (response && response.data) {
                dispatch({
                    type: ActionTypes.CHECKOUT_SUCCESS, payload: response.data
                });
                callback(response.data)
            }
        }
        catch (e) {
            dispatch({ type: ActionTypes.CHECKOUT_ERROR, payload: e?.response?.data?.message ?? 'Something went wrong' });
        }

    }
}