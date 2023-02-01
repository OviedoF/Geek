import { createStore } from "redux";
import reducer from "../reducers/index.js";
 
const store = createStore(reducer);
 
store.subscribe(() => console.log(store));
 
export default store;