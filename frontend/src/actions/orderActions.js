import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE, ORDER_CREATE_RESET} from '../constants/orderConstants'
import {ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILURE} from '../constants/orderConstants'
import {CART_CLEAR_ITEMS} from "../constants/cartConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log('posting order create')
        console.log(order)
        const {data} = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        })

        localStorage.removeItem('cartItems')

    } catch (error) {
        console.log(error);
        dispatch({
            type: ORDER_CREATE_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log('posting order create')

        const {data} = await axios.get(
            `/api/orders/${id}/`,
            config
        )
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}