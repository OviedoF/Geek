import {LOGIN, LOGOUT} from '../types/index';

export const login = (obj) => ({
    type: LOGIN,
    payload: obj
});

export const logout = (obj) => ({
    type: LOGOUT
});