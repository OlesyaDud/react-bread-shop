import React, { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Product from '../components/Product';
import {listProducts} from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

// import axios from 'axios';


const HomeScreen = () => {

    // no more hight order method connect(), using hooks instead:
    const dispatch = useDispatch();

    // 2. grab from the state updated products
    const productList = useSelector(state => state.productList);
    const  {loading, error, products} = productList;

    // before backend
    // const [products, setProducts] = useState([]);

    useEffect(() => {
        // before backend:
    //  const fetchProducts = async() => {
    //      const {data} = await axios.get('/api/products');

    //      setProducts(data);
    //  }
    //  fetchProducts();

    // with backend:
    // 1. fire action
    dispatch(listProducts());

    }, [dispatch]);

    return (
        <>
        <h1>Latest Products</h1>

        { 
        loading ? (<Loader />) : 
        error ? (<Message variant='danger'>{error}</Message>) :            
        (<Row>
            {products.map((product) => (
                <Col key ={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
            ))}
        </Row>)
        }

        </>
    )
}

export default HomeScreen
