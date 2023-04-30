import {combineReducers} from "redux"
import { UploadReducer } from "../Modules/Admin/upload/duck/reducer";
import {LoginReducer} from "../Modules/Login/duck/reducer";
import {AlbumReducer} from "../Modules/Admin/albums/duck/reducer";
import {TableReducer} from "../Shared/Component/Table/duck/reducer";
import {GroupReducer} from "../Modules/Admin/groups/duck/reducer";
import {OrdersReducer} from "../Modules/Admin/orders/duck/reducer";
import {MediaReducer} from "../Modules/Admin/photos/duck/reducer";
import {DashboardReducer} from "../Modules/Admin/dashboard/duck/reducer";


const reducers = combineReducers({
    login: LoginReducer,
    upload: UploadReducer,
    albums: AlbumReducer,
    table: TableReducer,
    groups: GroupReducer,
    orders: OrdersReducer,
    media: MediaReducer,
    dashboard: DashboardReducer
});


export default reducers;