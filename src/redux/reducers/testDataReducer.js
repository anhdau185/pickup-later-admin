import { UPDATE_TEST_DATA } from '../actions/types';

const testDataReducer = (prevState = 0, action) => {
    switch (action.type) {
        case UPDATE_TEST_DATA:
            return prevState + 1;
        default:
            return prevState;
    }
};

export default testDataReducer;
