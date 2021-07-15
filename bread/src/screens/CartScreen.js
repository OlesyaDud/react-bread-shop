import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import {addToCart, removeFromCart} from '../actions/cartActions';


const CartScreen = ({match, location, history}) => {
    const productId = match.params.id;

    //  ?qry=1
    // return in number format
    const quantity = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    // get items from storage and put them in a cart
    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    // console.log(cartItems);


    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    };

    const checkoutHandler =()=> {
        history.push('/login?redirect=shipping')
    };

    return (
<Row>
    <Col md={8}>

        <h2>Shopping Cart</h2>

        {cartItems.length === 0 ? (<Message>Your cart is empty <Link to='/'>Got Back</Link></Message>) : (
            <ListGroup variant='flush'>
                {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                        <Row>
                    {/* 1 */}
                            <Col md={2}>
                                <Image 
                                    src={item.image}
                                    alt={item.name}
                                    fluid
                                    rounded
                                />
                            </Col>
                    {/* 2 */}
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                    {/* 3 */}
                            <Col md={2}>$ {item.price}</Col>

                    {/* 4 */}
                            <Col md={2}>

                            <Form.Control
                                as='select' 
                                value={item.quantity}
                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Col>

                    {/* 5 */}
                            <Col md={2}>
                                <Button 
                                type='button'
                                variant='light'
                                onClick={()=> removeFromCartHandler(item.product)}
                                ><i className='fas fa-trash'></i></Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )}
    </Col>
    <Col md={4}>
         <Card>
             <ListGroup variant='flush'>
                <ListGroup.Item>
                {/* reduce takes accumulator and current */}
                    <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0 )}) items</h2>

                    ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                </ListGroup.Item>

                <ListGroup.Item>
                    <Button
                    type='button'
                    className='btn-block'
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    >Proceed to Checkout</Button>
                </ListGroup.Item>
             </ListGroup>
         </Card>                               
    </Col>
</Row>
    )
}

export default CartScreen
