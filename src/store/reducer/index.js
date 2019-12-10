import {combineReducers} from "redux";
import blogReducer from "./blogReducer";

const rootReducer = combineReducers({
    blogReducer: blogReducer
});

export default rootReducer;