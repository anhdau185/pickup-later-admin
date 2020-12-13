import { combineReducers } from 'redux';

import testDataReducer from './testDataReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    testData: testDataReducer,
    auth: authReducer
});

export default rootReducer;
