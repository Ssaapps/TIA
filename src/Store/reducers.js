import {combineReducers} from "redux"
import { UploadReducer } from "../Modules/Admin/upload/duck/reducer";
import {LoginReducer} from "../Modules/Login/duck/reducer";


const reducers = combineReducers({
    login: LoginReducer,
    upload:UploadReducer
});


export default reducers;