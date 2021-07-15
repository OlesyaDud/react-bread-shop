import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {Row, Form, Col, Image, ListGroup, Card, Button} from 'react-bootstrap';
import Rating from '../components/Rating';
import { listProductDetails } from '../actions/productActions';
// import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProductScreen = ({history, match}) => {
    // component level state
    const [quantity, setQuantity]= useState(1);

    const dispatch = useDispatch();


    const productDetails = useSelector(state => state.productDetails);
    const  {loading, error, product} = productDetails;

    // fetching from front end file
    // matchis id in params that is passed in
    // const product = products.find(p => p._id === match.params.id)


    // for one product, hence object---not needed after ackedn setup
    // const [product, setProduct] = useState({});

    useEffect(() => {

        dispatch(listProductDetails(match.params.id))
        // for fe only:
        // const fetchProduct = async() => {
        //     const {data} = await axios.get(`/api/products/${match.params.id}`);
   
        //     setProduct(data);
        // }
        // fetchProduct()
       }, [dispatch, match]);

       const addToCartHandler = () => {
           history.push(`/cart/${match.params.id}?qty=${quantity}`)
       }


    return (
        <>
        <Link className='btn btnGoBack my-3' to='/'>Go Back</Link> 

        { 
        loading ? (<Loader />) : 
        error ? (<Message variant='danger'>{error}</Message>) : 
        <Row>
               <Col md={6}>
                   <Image fluid src={product.image} alt={product.name} />
               </Col>

               <Col md={3}>
                   <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <h2>{product.name}</h2>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Rating value={product.rating} text={ `${product.numReviews} reviews`} />
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Price: ${product.price}
                      </ListGroup.Item>

                      <ListGroup.Item>
                        Description: {product.description}
                      </ListGroup.Item>
                   </ListGroup>
               </Col>

               <Col md={3}>
                   <Card>
                       <ListGroup varient='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Price:
                                </Col>

                                <Col>
                                    <strong>
                                        ${product.price}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    Status:
                                </Col>

                                <Col>
                                    <strong>
                                        ${product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 &&(
                            <ListGroup.Item>
                                <Row>
                                    <Col>Quantity:</Col>
                                    <Col>
                                        <Form.Control
                                        as='select' 
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        >
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ) }


                        <ListGroup.Item>
                        <Button
                        onClick={addToCartHandler} 
                        className='btn otherBtn' 
                        type='button' 
                        disabled={product.countInStock === 0}>Add to Cart</Button>
                      </ListGroup.Item>
                       </ListGroup>
                   </Card>
               </Col>
           </Row>
        }
        </>
    )
}

export default ProductScreen;
