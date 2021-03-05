import React, {useState, useEffect} from "react";
import {LinkContainer} from "react-router-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Table, Button, FormGroup, Tab} from "react-bootstrap";
import Message from "../components/Message"
import Loader from "../components/Loader"
import {listOrders, deliverOrder} from "../actions/orderActions"

function OrderListScreen({history}) {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])

    // const markDeliveredHandler = () => {
    //     dispatch(deliverOrder(order))
    // }

    return (
        <div>
            <h1>Orders</h1>
            {loading ? (<Loader/>) : error ? (<Message variant={'danger'}>{error}</Message>) : (
                <Table striped bordered hover responsive className={'table-sm'}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>PRICE</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substr(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>
                                {order.isPaid ? (
                                    order.paidAt.substr(0, 10)
                                ) : (
                                    <i className={'fas fa-check'} style={{color: 'red'}}/>
                                )}
                            </td>
                            <td>
                                {order.isDelivered ? (
                                    order.deliveredAt.substr(0, 10)
                                ) : (
                                    <i className={'fas fa-check'} style={{color: 'red'}}/>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant={'light'} className={'btn-sm'}>
                                        Details
                                    </Button>
                                </LinkContainer>
                            </td>
                            {/*<td>*/}
                            {/*    <Button variant={'danger'} className={'btn-sm'}*/}
                            {/*            onClick={() => markDeliveredHandler(order._id)}>*/}
                            {/*        /!*<i className={'fas fa-trash'}/>*!/*/}
                            {/*        Mark Delivered*/}
                            {/*    </Button>*/}
                            {/*</td>*/}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default OrderListScreen