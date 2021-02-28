import {USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from '../constants/userLoginConstants'
import {
    USER_LIST_FAILURE,
    USER_LIST_REQUEST,
    USER_LIST_RESET,
    USER_LIST_SUCCESS
} from '../constants/userRegisterConstants'
import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
    USER_DETAILS_RESET,
    USER_REGISTER_FAILURE,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS
} from '../constants/userRegisterConstants'
import {
    USER_UPDATE_PROFILE_FAILURE,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_RESET
} from '../constants/userRegisterConstants'

import {
    USER_DELETE_FAILURE,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
} from '../constants/userRegisterConstants'

import axios from "axios";
import {PRODUCT_LIST_SUCCESS} from "../constants/productConstants";
import {ORDER_LIST_MY_RESET} from "../constants/orderConstants";

export const userLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
        const {data} = await axios.post(
            '/api/users/login/',
            {'username': email, 'password': password},
            config
        )
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}

export const userLogout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET})
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USER_LIST_RESET})
}


export const userRegister = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
        const {data} = await axios.post(
            '/api/users/register/',
            {'name': name, 'email': email, 'password': password},
            config
        )
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(
            /*id is going to be "profile"*/
            `/api/users/${id}`,
            config
        )
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_DETAILS_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.put(
            /*id is going to be "profile"*/
            `/api/users/profile/update/`,
            user,
            config
        )
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_UPDATE_PROFILE_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}

export const listUsers = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(
            /*id is going to be "profile"*/
            `/api/users/`,
            config
        )
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_LIST_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const {userLogin: {userInfo}} = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.delete(
            /*id is going to be "profile"*/
            `/api/users/delete/${id}`,
            config
        )
        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_DELETE_FAILURE,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail :
                error.message
        })
    }
}