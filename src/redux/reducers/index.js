import { combineReducers } from "redux";
import screensActiveReducer from "./screensActive.reducer";
import authReducer from "./auth.reducer";

const reducer = combineReducers({
    auth: authReducer,
    screensActive: screensActiveReducer
});
 
export default reducer;