import { accountLogin } from 'api';
import {
    AUTHENTICATE_START,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAILURE
} from './types';

const authenticateStart = () => ({ type: AUTHENTICATE_START });

const authenticateSuccess = auth => ({
    type: AUTHENTICATE_SUCCESS,
    auth
});

const authenticateFailure = error => ({
    type: AUTHENTICATE_FAILURE,
    error
});

const authenticate = (login, callback) => dispatch => {
    dispatch(authenticateStart());
    accountLogin(login)
        .then(response => dispatch(authenticateSuccess(response)))
        .catch(error => dispatch(authenticateFailure(error)))
        .finally(() => {
            if (typeof callback === 'function') callback();
        });
};

export default authenticate;
