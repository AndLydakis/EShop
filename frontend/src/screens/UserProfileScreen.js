import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, Form, Button, FormGroup, Table} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import Message from "../components/Message"
import Loader from "../components/Loader"
import {getUserDetails, updateUserProfile} from "../actions/userActions"
import {listMyOrders} from "../actions/orderActions"
import {USER_UPDATE_PROFILE_RESET} from '../constants/userRegisterConstants'

function UserProfileScreen({history}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails);
    const {error, loading, user} = userDetails;

    const userlogin = useSelector(state => state.userLogin);
    const {userInfo} = userlogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const {loading: loading_orders, error: error_orders, orders} = orderListMy;

    useEffect(() => {
        /*if not logged in*/
        if (!user) {
            history.push('/login')
        } else {
            /*if we don't have user info, get the data*/
            if (!user || !user.name || success) {
                /*clear state*/
                dispatch({type: USER_UPDATE_PROFILE_RESET});
                dispatch(getUserDetails("profile"))
                dispatch(listMyOrders())
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, userInfo, user, success]);

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            console.log('Updating Profile')
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('');
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {loading && <Loader/>}

                <Form onSubmit={submitHandler}>

                    <FormGroup controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e => {
                                setName(e.target.value)
                            })}
                        />
                    </FormGroup>

                    <FormGroup controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e => {
                                setEmail(e.target.value)
                            })}
                        />
                    </FormGroup>

                    <FormGroup controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e => {
                                setPassword(e.target.value)
                            })}
                        />
                    </FormGroup>

                    <FormGroup controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e => {
                                setConfirmPassword(e.target.value)
                            })}
                        />
                    </FormGroup>

                    <Button type='submit' variant='primary'>Update</Button>
                </Form>

            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loading_orders ? (<Loader/>)
                    : error_orders ? (<Message variant={'danger'}>{error_orders}</Message>)
                        : (
                            <Table striped responsive className={'table-sm'}>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map(ord => (
                                    <tr>
                                        <td>{ord._id}</td>
                                        <td>{ord.createdAt.substr(0, 10)}</td>
                                        <td>${ord.totalPrice}</td>
                                        <td>{ord.isPaid ? ord.paidAt.substr(0, 10) : (
                                            <i className={'fas fa-times'} style={{color: 'red'}}></i>)}</td>
                                        <td><LinkContainer
                                            to={`/order/${ord._id}`}>
                                            <Button className={'btn-sm'}>Details</Button>
                                        </LinkContainer></td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        )}
            </Col>
        </Row>
    )
}

export default UserProfileScreen