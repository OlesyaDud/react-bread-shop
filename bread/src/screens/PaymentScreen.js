import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Form, Button, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import {savePaymentMethod} from '../actions/cartActions';
import Checkout from '../components/Checkout';

const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;

    // if there is not shipping address, redirect to shipping
    if(!shippingAddress) {
        history.push('/shipping')
    };

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();


    const submitHandler =(e)=> {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        // move to next page
        history.push('/placeorder');
    }

    return (
    <FormContainer>
    <Checkout step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>

            <Form.Group controlId='address'>
                <Form.Label as="legend">Select Payment Method</Form.Label>

            <Col>
                <Form.Check 
                type='radio' 
                label='PayPal or Credit Card' 
                id='PayPal' 
                name='paymentMethod' 
                value='PayPal' 
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                >
                </Form.Check>

                {/* <Form.Check 
                type='radio' 
                label='Stripe' 
                id='Stripe' 
                name='paymentMethod' 
                value='Stripe' 
                onChange={(e) => setPaymentMethod(e.target.value)}
                >
                </Form.Check> */}
            </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;