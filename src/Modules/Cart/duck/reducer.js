import { ActionTypes } from "./type";
import Cookies from "js-cookie";


const cartItems = JSON.parse(localStorage.getItem("cart")) ?? [];

const initialState = {
    items: cartItems

}

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.CART_ADD:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case ActionTypes.CART_REMOVE:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id)
            }
        default:
            return state

    }
}

