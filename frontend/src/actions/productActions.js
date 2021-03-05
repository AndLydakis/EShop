import {
    PRODUCT_DELETE_FAILURE,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS,
    PRODUCT_LIST_FAILURE,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from '../constants/productConstants'
import {
    PRODUCT_CREATE_REVIEW_FAILURE,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_RESET,
} from '../constants/productConstants'
import {PRODUCT_DETAILS_FAILURE, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS} from '../constants/productConstants'

import {PRODUCT_CREATE_FAILURE, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS} from '../constants/productConstants'
import {PRODUCT_UPDATE_FAILURE, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS} from '../constants/productConstants'
import {PRODUCT_TOP_FAILURE, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS} from '../constants/productConstants'

import axios from 'axios';
import {ORDER_LIST_MY_FAILURE, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS} from "../constants/orderConstants";

export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const {data} = await axios.get(`/api/products${keyword}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCT_LIST_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_TOP_REQUEST})
        const {data} = await axios.get(`/api/products/top/`)
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCT_TOP_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        console.log("### ID", id);
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log("###", error);
        dispatch({
            type: PRODUCT_DETAILS_FAILURE,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.delete(
            `/api/products/delete/${id}/`,
            config
        )
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCT_DELETE_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/products/create/`,
            {},
            config
        )
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCT_CREATE_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        console.log('In Action', product)
        const {data} = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        )
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCT_UPDATE_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(
            `/api/products/${productId}/reviews/`,
            review,
            config
        )
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}
