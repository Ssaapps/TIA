import { ActionTypes } from "./type";
import Cookies from "js-cookie";


const cartItems = JSON.parse(localStorage.getItem("cart")) ?? [];

const initialState = {
    items: cartItems,
    checkout: {
        loading: false,
        data: null,
        success: false,
        error: null
    },
    status: {
        loading: false,
        data: null,
        success: false,
        error: null

    }

}

export const CartReducer = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.CART_ADD:
            return {
                ...state,
                items: state.items.find((item) => item.id === action.payload.id) ? [...state.items] : [...state.items, action.payload]
            }
        case ActionTypes.CART_REMOVE:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id)




            }
        ///Checkout
        case ActionTypes.CHECKOUT_REQUEST:
            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.CHECKOUT_SUCCESS:
            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    loading: false,
                    data: action.payload,
                    success: true,
                    error: null
                }
            }
        case ActionTypes.CHECKOUT_ERROR:
            return {
                ...state,
                checkout: {
                    ...state.checkout,
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        case ActionTypes.STATUS_REQUEST:
            return {
                ...state,
                status: {
                    ...state.status,
                    loading: true,
                    success: false,
                    error: null
                }
            }
        case ActionTypes.STATUS_SUCCESS:
            return {
                ...state,
                status: {
                    ...state.status,
                    loading: false,
                    data: action.payload,
                    success: true,
                    error: null
                }
            }
        case ActionTypes.STATUS_ERROR:
            return {
                ...state,
                status: {
                    ...state.status,
                    loading: false,
                    success: false,
                    error: action.payload
                }
            }
        default:
            return state

    }
}

