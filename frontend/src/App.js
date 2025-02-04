import {Container} from 'react-bootstrap'
import {HashRouter as Router, Route} from 'react-router-dom'
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

function App() {
    return (
        <Router>
            <Header/>
            <main className="py-3">
                <Container>
                    <Route path='/' component={HomeScreen} exact/>
                    <Route path='/login' component={LoginScreen}/>
                    <Route path='/register' component={RegisterScreen}/>
                    <Route path='/profile' component={UserProfileScreen}/>
                    <Route path='/shipping' component={ShippingScreen}/>
                    <Route path='/payment' component={PaymentScreen}/>
                    <Route path='/placeorder' component={PlaceOrderScreen}/>
                    <Route path='/home' component={HomeScreen} exact/>
                    <Route path='/product/:id' component={ProductScreen}/>

                    <Route path='/cart/:id?' component={CartScreen}/>
                    <Route path='/order/:id' component={OrderDetailsScreen}/>

                    <Route path='/admin/userlist/' component={UserListScreen}/>
                    <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
                    <Route path='/admin/productlist' component={ProductListScreen}/>
                    <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
                    <Route path='/admin/orderlist/' component={OrderListScreen}/>
                </Container>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
