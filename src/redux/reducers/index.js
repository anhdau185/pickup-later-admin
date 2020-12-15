import { combineReducers } from 'redux';

import testDataReducer from './testDataReducer';
import authReducer from './authReducer';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
    testData: testDataReducer,
    auth: authReducer,
    products: productsReducer
});

export default rootReducer;
