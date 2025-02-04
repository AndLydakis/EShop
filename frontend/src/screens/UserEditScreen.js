import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {Form, Button, FormGroup} from "react-bootstrap";
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import {getUserDetails, updateUser} from "../actions/userActions"
import {USER_UPDATE_RESET} from "../constants/userRegisterConstants";

function UserEditScreen({match, history}) {
    const userId = match.params.id

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails);
    const {error, loading, user} = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const {error: update_error, loading: update_loading, success: update_success} = userUpdate;

    useEffect(() => {
        if (update_success) {
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        } else {
            if (!user.name || (user._id !== Number(userId))) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }

    }, [userId, user, update_success, history]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: user._id, name, email, isAdmin}));
    }

    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loading ? <Loader/> : error ? (<Message variant={'danger'}>{error}</Message>) : (
                    <Form onSubmit={submitHandler}>

                        <FormGroup controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
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
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e => {
                                    setEmail(e.target.value)
                                })}
                            />
                        </FormGroup>

                        <FormGroup controlId='isAdmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e => {
                                    setIsAdmin(e.target.checked)
                                })}
                            />
                        </FormGroup>

                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                )}

            </FormContainer>
        </div>
    )
}

export default UserEditScreen;