import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {PayPalButton} from "react-paypal-button-v2";
import {Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getOrderDetails, payOrder, deliverOrder} from "../actions/orderActions";
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from "../constants/orderConstants";

function OrderDetailsScreen({match, history}) {

    const orderId = match.params.id;
    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)

    // const orderCreate = useSelector(state => state.orderDetails)
    // const {order, error, loading} = orderCreate

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const {loading: deliver_loading, success: deliver_success} = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const cart = useSelector(state => state.cart);
    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc += item.price * item.qty, 0).toFixed(2)
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = "https://www.paypal.com/sdk/js?client-id=AVtyJr8_oliBCx27J2b6UbaWgIUGEeUdUsxFEcMa8yP7R0k4kCkoGMvaTeDtNPscBxg0LJAAT1Qj6gag"
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if(!userInfo){
            history.push('/login');
        }
        if (!order || successPay || order._id !== Number(orderId) || deliver_success) {
            dispatch({type: ORDER_PAY_RESET});
            dispatch({type: ORDER_DELIVER_RESET});
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, order, orderId, successPay, userInfo, deliver_success])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const markDeliveredHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? (<Loader/>) :
        error ? (<Message variant={'danger'}>{error}</Message>) :
            (
                <div>
                    <h1>Order: {orderId}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant={'flush'}>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p><strong>Name: </strong>{order.user.name}</p>
                                    <p><strong>Email: </strong>
                                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                    <p>
                                        <strong>Shipping: </strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}
                                        {' '}
                                        {order.shippingAddress.postalCode}
                                        {' '}
                                        {order.shippingAddress.country}
                                    </p>
                                    {order.isDelivered ? (
                                        <Message variant={'success'}>Delivered on {order.deliveredAt}</Message>
                                    ) : (
                                        <Message variant={'warning'}>Order not yet delivered</Message>
                                    )
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant={'success'}>Paid on {order.paidAt}</Message>
                                    ) : (
                                        <Message variant={'warning'}>Order not yet paid</Message>
                                    )
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? (
                                        <Message variant={'info'}>Your Order Is Empty</Message>
                                    ) : (
                                        <ListGroup variant={'flush'}>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                                        </Col>
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} x ${item.price} =
                                                            ${(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>

                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant={"flush"}>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items:</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping:</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax:</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total:</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader/>}
                                            {!sdkReady ? <Loader/> :
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            }
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                        <ListGroup.Item>
                                            <Button
                                                type={'button'}
                                                className={'btn btn-block'}
                                                onClick={markDeliveredHandler}
                                            >Mark As Delivered</Button>
                                        </ListGroup.Item>
                                    )
                                    }
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
}

export default OrderDetailsScreen