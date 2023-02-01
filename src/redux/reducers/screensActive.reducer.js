import { ACTIVE_SCREEN, DESACTIVE_SCREEN, RESET_ALL } from "../types";

const initialState = {
    isLoading: false,
    isLoadingText: '',
    error: false,
    errorText: '',
    success: false,
    successText: ''
}

export default function screensActiveReducer(state = initialState, action){
    switch (action.type) {
        case ACTIVE_SCREEN:
            const screenText = `${action.payload.screen}Text`
            return {
                ...state,
                [action.payload.screen]: true,
                [screenText]: action.payload.message ? action.payload.message : ''
            }
        case RESET_ALL:
                return initialState
        case DESACTIVE_SCREEN:
            const text = `${action.payload}Text`
            return {
                ...state,
                [action.payload]: false,
                [text]: ''
            }
        default:
            return state
    }
};