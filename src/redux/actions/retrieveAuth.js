import { RETRIEVE_AUTH } from './types';

const retrieveAuth = () => {
    let auth = null;
    const retrievedJson = window.localStorage.getItem('storedAuth');
    if (retrievedJson) {
        auth = JSON.parse(retrievedJson);
    }
    return {
        type: RETRIEVE_AUTH,
        auth
    };
};

export default retrieveAuth;
