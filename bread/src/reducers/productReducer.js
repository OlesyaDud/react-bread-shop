import {
    PROD_LIST_FAIL,
    PROD_LIST_REQ,
    PROD_LIST_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST
} from '../types/productConstants';


export const productListReducer = (
    state={products: []}, 
    action
    ) => {
        switch (action.type) {
            case PROD_LIST_REQ:
                return { loading: true, products: [] }
            case PROD_LIST_SUCCESS:
                return { loading: false, products: action.payload }
            case PROD_LIST_FAIL:
                return { loading: false, error: action.payload }
            default:
                return state;  
        }   
    };

export const productDetailsReducer = (
    state={product: { reviews: []}}, 
    action
    ) => {
        switch (action.type) {
            case PRODUCT_DETAILS_REQUEST:
                return { loading: true, ...state }
            case PRODUCT_DETAILS_SUCCESS:
                return { loading: false, product: action.payload }
            case PRODUCT_DETAILS_FAIL:
                return { loading: false, error: action.payload }
            default:
                return state;  
        }   
    };