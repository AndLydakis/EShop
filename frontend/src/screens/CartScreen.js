import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, ListGroup, Form, Image, Button, Card} from "react-bootstrap";
import Message from "../components/Message"
import {addToCart} from "../actions/cartActions"

function CartScreen({match, location, history}) {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const {cartItems} = useSelector(state => state.cart)

    console.log("---", cartItems)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    return (
        <div>
            Cart Screen
        </div>
    )
}

export default CartScreen;