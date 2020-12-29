import { LOGOUT } from './types';

const logout = () => {
    window.localStorage.removeItem('storedAuth');
    return { type: LOGOUT };
};

export default logout;
