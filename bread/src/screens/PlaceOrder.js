import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Row, Col, Image, Card, ListGroup, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Message from '../components/Message';
import Checkout from '../components/Checkout';
import {createOrder} from '../actions/orderActions';


const PlaceOrder = ({history}) => {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    }

    // Calculate price
    cart.itemsPrice = addDecimals(cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    ));

    // if under 100 $ - 10$ shipping
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 15);

    // 15 %, 2 decimal points
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

    cart.totalPrice = (
        Number(cart.itemsPrice) + 
        Number(cart.shippingPrice) + 
        Number(cart.taxPrice)
        ).toFixed(2);

    const orderCreate = useSelector(state => state.orderCreate);
    const {order, success, error} = orderCreate;

    useEffect(() => {
        if(success) {
            history.push(`/orders/${order._id}`)
        }
        // eslint-disable-next-line 
    }, [history, success])

    const placeOrderHandler =()=> {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice

        }));
    };

    return (
        <>
        <Checkout step1 step2 step3 step4 />
        <Row>
           <Col md={8}>
                <ListGroup valiant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>

                        <strong>Address:</strong>
                        <p>
                        {cart.shippingAddress.address}{" "}
                        {cart.shippingAddress.city}{" "}
                        {cart.shippingAddress.postalcode}, {" "}
                        {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <strong>Payment Method: <br/></strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                            <ListGroup variant="flush">
                                {cart.cartItems.map((item, index) => (
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
                                ${cart.itemsPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>
                                ${cart.shippingPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax</Col>
                            <Col>
                                ${cart.taxPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>
                                ${cart.totalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        {error && <Message variant='danger'>{error}</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button type="button" 
                        className="btn-block"
                        disabled={cart.cartItems === 0}
                        onClick={placeOrderHandler}
                        > Place Order</Button>
                    </ListGroup.Item>

                  </ListGroup>
              </Card>                      
           </Col>
        </Row>
            
        </>
    )
}

export default PlaceOrder;
