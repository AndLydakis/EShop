import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, Form, Button, FormGroup} from "react-bootstrap";
import Message from "../components/Message"
import Loader from "../components/Loader"
import {getUserDetails, userRegister} from "../actions/userActions"
import FormContainer from "../components/FormContainer";

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

    useEffect(() => {
        /*if not logged in*/
        if (!user) {
            history.push('/login')
        } else {
            /*if we don't have user info, get the data*/
            if (!user || !user.name) {
                dispatch(getUserDetails("profile"))
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, userInfo, user]);

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        }else{
            console.log('Updating Profile')
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {loading && <Loader />}

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
            <Col md={3}><h2>My Orders</h2></Col>
        </Row>
    )
}

export default UserProfileScreen