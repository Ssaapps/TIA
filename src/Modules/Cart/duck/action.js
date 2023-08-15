import { ActionTypes } from "./type";
import Cookies from "js-cookie";
import Axios from "../../../Shared/utils/axios_instance";
import { makeHttpRequest } from "../../../Shared/utils/common";


export const addItemToCart = (item, callback = () => { }) => {
    return async function (dispatch) {
        let tempCart = []
        const rawCart = localStorage.getItem("cart")
        let itemAlreadyInCart = false
        if (rawCart) {
            const items = JSON.parse(rawCart)
            if (items.find((cartItem) => cartItem.id === item.id)) {
                tempCart = [...items]
                itemAlreadyInCart = true
            }
            else {
                tempCart = [...items, item]
            }
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
        else {
            tempCart.push(item)
            localStorage.setItem("cart", JSON.stringify(tempCart))
        }
        dispatch({ type: ActionTypes.CART_ADD, payload: item });
        callback(itemAlreadyInCart)
    }
}
export const removeItemFromCart = (item, callback = () => { }) => {
    return async function (dispatch) {
        let tempCart = []
        const rawCart = localStorage.getItem("cart")
        if (rawCart) {
            tempCart = JSON.parse(rawCart)
            tempCart = tempCart.filter((cartItem) => cartItem.id !== item.id)
        }
        dispatch({ type: ActionTypes.CART_REMOVE, payload: item });
        callback()
    }
}



export const checkout = (cartItems, callback, onError) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.CHECKOUT_REQUEST });
        try {
            const response = await Axios.post("/orders", {
                media: cartItems.map((item) => item.id)
            })
            console.log(response.data)
            if (response && response.data) {
                await callback(response.data)
                dispatch({
                    type: ActionTypes.CHECKOUT_SUCCESS, payload: response.data
                });
            }
        }
        catch (e) {
            dispatch({ type: ActionTypes.CHECKOUT_ERROR, payload: e?.response?.data?.message ?? 'Something went wrong' });
            onError(e)
        }

    }
}


export const checkOrderStatus = (orderId,) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.STATUS_REQUEST });
        try {
            const response = await Axios.get(`/orders/${orderId}/status`)
            if (response && response.data) {
                dispatch({
                    type: ActionTypes.STATUS_SUCCESS, payload: response.data
                });
            }
        }
        catch (e) {

            dispatch({ type: ActionTypes.STATUS_ERROR, payload: e?.response?.data?.message ?? 'Something went wrong' });
        }

    }
}



export const getOrders = (currentPage) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.ORDERS_REQUEST });
        makeHttpRequest({
            path: `orders?page=${currentPage}&per_page=10`,
            method: "GET",
        }, {
            SUCCESS: ActionTypes.ORDERS_SUCCESS,
            ERROR: ActionTypes.ORDERS_ERROR
        }, dispatch);
    }
}
