import {combineReducers} from "redux"
import {LoginReducer} from "../Modules/Login/duck/reducer";


const reducers = combineReducers({
    login: LoginReducer,
});


export default reducers;