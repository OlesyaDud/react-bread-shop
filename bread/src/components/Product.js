import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import {Link} from 'react-router-dom'

const Product = (props) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/products/${props.product._id}`}>
                <Card.Img className='imageSize' src={props.product.image} variant='top' />
            </Link>

            <Card.Body>
            <Link to={`/products/${props.product._id}`}>
            <Card.Title as='div'>{props.product.name}</Card.Title>
            </Link>

            <Card.Text as='div'>
            <Rating 
                value={props.product.rating}
                text={`${props.product.numReviews} reviews`}
                // if I want to set color here and pass to Rating
                // color='rgb(173, 160, 86)'
            />
            {/* <div className="my-4">
                {props.product.rating} from {props.numReviews} reviews
            </div> */}
            </Card.Text>

            <Card.Text as='h3'>
                $ {props.product.price}
            </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;
