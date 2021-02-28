import React, {useState} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'
import {Nav, Navbar, Container, Row, Col, NavDropdown} from 'react-bootstrap'
import {Link} from "react-router-dom";
import {userLogout} from '../actions/userActions'

function Header() {

    const userlogin = useSelector(state => state.userLogin);
    const {error, loading, userInfo} = userlogin;
    const dispatch = useDispatch();
    const logoutHandler = (e) => {
        console.log('logout');
        dispatch(userLogout());
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                    <NavDropdown id='userName' title={userInfo.name}>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                )
                                : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                    </LinkContainer>
                                )
                            }

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown id='adminmenu' title='Admin'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header