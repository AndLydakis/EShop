import axios from "axios";
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`);

    console.log("ADD TO CART: ", id, qty)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    console.log("JSON: ", JSON.stringify(getState().cart.cartItems))
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    console.log("REMOVE FROM CART: ", id)
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}