import { getProducts } from 'api';
import {
    FETCH_PRODUCTS_START,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_FAILURE
} from './types';

const fetchProductsStart = () => ({ type: FETCH_PRODUCTS_START });

const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    products
});

const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    error
});

const fetchProducts = (paging, callback) => dispatch => {
    dispatch(fetchProductsStart());
    getProducts(paging)
        .then(response => dispatch(fetchProductsSuccess(response)))
        .catch(error => dispatch(fetchProductsFailure(error)))
        .finally(() => {
            if (typeof callback === 'function') callback();
        });
};

export default fetchProducts;
