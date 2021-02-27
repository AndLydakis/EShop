import {USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from '../constants/userLoginConstants'
import {USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS} from '../constants/userRegisterConstants'

import axios from "axios";
import {PRODUCT_LIST_SUCCESS} from "../constants/productConstants";

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
    dispatch({
        type: USER_LOGOUT
    })
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