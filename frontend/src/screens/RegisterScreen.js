import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, Form, Button, FormGroup} from "react-bootstrap";
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import {userRegister} from "../actions/userActions"

function RegisterScreen({location, history}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
    const userregister = useSelector(state => state.userRegister);
    const {error, loading, userInfo} = userregister;

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo)
            history.push(redirect)
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault()
        if (password!==confirmPassword){
            setMessage('Passwords do not match');
        }
        dispatch(userRegister(name, email, password))
    }

    return (
        <FormContainer>
            <h1>Register</h1>
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
                        required
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
                        required
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e => {
                            setConfirmPassword(e.target.value)
                        })}
                    />
                </FormGroup>

                <Button type='submit' variant='primary'>Register</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Existing Customer? <Link to={redirect ? `/login?/redirect=${redirect}` : '/login'}>Sign in</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen;