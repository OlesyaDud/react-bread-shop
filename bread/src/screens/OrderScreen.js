import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import {useDispatch, useSelector} from 'react-redux';
import { Row, Col, Image, Card, ListGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getOrderDetails, payOrder} from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../types/orderConstants';

const OrderScreen = ({match}) => {
    // get order id
    const orderId = match.params.id;

    // for paypal
    const [sdkReady, setSdkReady] = useState(false);

    const dispatch = useDispatch();

   const orderDetails = useSelector(state => state.orderDetails);
    // 1. order state that is received from getOrderDetails
    const {order, loading, error} = orderDetails;

      // for paypal
    const orderPay = useSelector(state => state.orderPay);
    // because we have loading, will rename to loadingPay, same for success
    const {loading: loadingPay, success: successPay} = orderPay;

    if(!loading) {
        // calc order
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2);
        };
        order.itemsPrice = addDecimals(order.orderItems.reduce(
            (acc, item) => acc + item.price * item.quantity, 0
        ));  
    };

     // generate here: https://developer.paypal.com/developer/applications/
    //  paypal button install react-paypal-button-v2
    useEffect(() => {
        const addPayPalScript = async () => {
            // fetch clientId from backend
            const {data: clientId} = await axios.get('/api/config/paypal');
            console.log(clientId);

            const script = document.createElement('script');
            script.type = 'text/javascript'
            // comes from here: https://developer.paypal.com/docs/checkout/reference/customize-sdk/
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
     
        // addPayPalScript()


    // in both cases, when order is not there-dispatch, and when payment is successful dispatch
        // check for the order, make sure order id matches to the the one in url, if it does not than dispatch getOrderDetails to fetch most recent order
        if(!order || successPay || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET});
            dispatch(getOrderDetails(orderId));
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId]);

    const successPaymentHandler =(paymentResult)=> {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));

    }

    return loading ? (<Loader />) :
    error ? (<Message variant='danger'>{error}</Message>) :
    (<>
        <h1>Order {order._id}</h1>
        <Row>
        <Col md={8}>
            <ListGroup valiant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    {/* order/user relationshp--> populate() on the backend */}
                    <p><strong>Name:</strong> {order.user.name}</p>
                    <p><strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>

                    <strong>Address:</strong>
                    <p>
                    {/* pulling n from 1.order state */}
                    {order.shippingAddress.address}{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalcode}, {" "}
                    {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? <Message variand="success">Delivered on {order.deleveredAt}</Message> : <Message variand="danger">Not Delivered</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <p><strong>Payment Method: <br/></strong>
                    {order.paymentMethod}
                    </p>
                    {order.isPaid ? <Message variand="success">Paild on {order.paidAt}</Message> : <Message variand="danger">Not Paid</Message>}
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                        <ListGroup variant="flush">
                            {order.orderItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>

                                        <Col>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </Col>

                                        <Col md={4}>
                                            {item.quantity} x ${item.price} = ${item.quantity * item.price}
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
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Items</Col>
                            <Col>
                                ${order.itemsPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>
                                ${order.shippingPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>
                                ${order.taxPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>
                                ${order.totalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {!order.isPaid && (
                        <ListGroup.Item>
                            
                                <PayPalButton 
                                    amount={order.totalPrice}
                                    onSuccess = {successPaymentHandler}
                                />
                            
                            {/* {loadingPay && <Loader />}
                            {!sdkReady ? <Loader/> : (
                                <PayPalButton 
                                    amount={order.totalPrice}
                                    onSuccess = {successPaymentHandler}
                                />
                            )} */}
                        </ListGroup.Item>
                    )}
                  </ListGroup>
              </Card>                      
           </Col>
        </Row>
    </>)
}

export default OrderScreen;
