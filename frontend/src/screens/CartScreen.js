import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, ListGroup, Form, Image, Button, Card} from "react-bootstrap";
import Message from "../components/Message"
import {addToCart, removeFromCart} from "../actions/cartActions"

function CartScreen({match, location, history}) {
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const {cartItems} = useSelector(state => state.cart)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        console.log('Remove ', id);
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        console.log('To Checkout');
        history.push('/login?redirect=shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>Your Cart Is Empty.<br/> <Link to='/'>Go Back</Link></Message>
                ) : (
                    <ListGroup variant='flush' key={'a'}>
                        {cartItems.map((item) => (
                            <ListGroup>
                                <Row key={item.product}>
                                    <Col md={2}><Image src={item.image} alt={item.name} fluid rounded></Image></Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>

                                    <Col md={3}>
                                        <Form.Control
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup>
                        ))}
                    </ListGroup>
                )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + parseInt(item.qty), 0)}) items </h2>
                            <h2>Price
                                $({cartItems.reduce((acc, item) => acc + parseFloat(item.price) * parseFloat(item.qty), 0).toFixed(2)})</h2>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;