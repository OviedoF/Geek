import {LOGIN, LOGOUT} from '../types/index';

const initialState = false;

export default function authReducer(state = initialState, action){
    switch (action.type) {
        case LOGIN:
            return action.payload;
        case LOGOUT:
            return false;
        default:
            return state;
    }
}
