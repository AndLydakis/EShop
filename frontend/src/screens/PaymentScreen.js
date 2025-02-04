import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Form, Button, FormGroup, Col} from "react-bootstrap";
import {savePaymentMethod} from '../actions/cartActions'
import FormContainer from "../components/FormContainer"
import CheckoutSteps from "../components/CheckoutSteps";

function PaymentScreen({history}) {

    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    if (!shippingAddress.address) {
        history.push('/shipping');
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod));
        console.log('redirecting to place order')
        history.push('/placeorder');
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>

            <Form
                onSubmit={submitHandler}
            >
                <Form.Group>
                    <Form.Label as='legend'>Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => {
                                setPaymentMethod(e.target.value)
                            }}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen