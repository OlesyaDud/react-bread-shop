import axios from 'axios';
import {
    PROD_LIST_FAIL,
    PROD_LIST_REQ,
    PROD_LIST_SUCCESS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST
} from '../types/productConstants';

// redux thunk allowes functin after function, we dispatch consts
export const listProducts = () => async (dispatch) => { 

    try {
        dispatch({type: PROD_LIST_REQ});

        const {data} = await axios.get('/api/products');

        dispatch({
            type: PROD_LIST_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PROD_LIST_FAIL,
            // generic messgae or if there is one on the backend-send that one
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};


export const listProductDetails = (id) => async (dispatch) => { 

    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            // generic messgae or if there is one on the backend-send that one
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};