import { getStores } from 'api';
import {
    FETCH_STORES_START,
    FETCH_STORES_SUCCESS,
    FETCH_STORES_FAILURE
} from './types';

const fetchStoresStart = () => ({ type: FETCH_STORES_START });

const fetchStoresSuccess = products => ({
    type: FETCH_STORES_SUCCESS,
    products
});

const fetchStoresFailure = error => ({
    type: FETCH_STORES_FAILURE,
    error
});

const fetchStores = (paging, callback) => dispatch => {
    dispatch(fetchStoresStart());
    getStores(paging)
        .then(response => dispatch(fetchStoresSuccess(response)))
        .catch(error => dispatch(fetchStoresFailure(error)))
        .finally(() => {
            if (typeof callback === 'function') callback();
        });
};

export default fetchStores;
