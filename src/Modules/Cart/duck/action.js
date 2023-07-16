import { ActionTypes } from "./type";
import Cookies from "js-cookie";
import Axios from "../../../Shared/utils/axios_instance";


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



export const checkout = (cartItems, callback) => {
    return async function (dispatch) {
        dispatch({ type: ActionTypes.CHECKOUT_REQUEST });
        try {
            const response = await Axios.post("/orders", {
                photos: cartItems.map((item) => item.id)
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
        }

    }
}