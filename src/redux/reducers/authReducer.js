import {
    AUTHENTICATE_START,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAILURE,
    RETRIEVE_AUTH,
    LOGOUT
} from '../actions/types';

const authReducer = (prevState = null, action) => {
    switch (action.type) {
        case AUTHENTICATE_START:
            return prevState;
        case AUTHENTICATE_SUCCESS:
            return action.auth;
        case AUTHENTICATE_FAILURE:
            return prevState;
        case RETRIEVE_AUTH:
            return action.auth || prevState;
        case LOGOUT:
            return null;
        default:
            return prevState;
    }
};

export default authReducer;
