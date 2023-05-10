import {combineReducers} from "redux"
import { UploadReducer } from "../Modules/Admin/upload/duck/reducer";
import {LoginReducer} from "../Modules/Auth/duck/reducer";
import {AlbumReducer} from "../Modules/Admin/albums/duck/reducer";
import {TableReducer} from "../Shared/Component/Table/duck/reducer";
import {GroupReducer} from "../Modules/Admin/groups/duck/reducer";
import {OrdersReducer} from "../Modules/Admin/orders/duck/reducer";
import {MediaReducer} from "../Modules/Admin/photos/duck/reducer";
import {DashboardReducer} from "../Modules/Admin/dashboard/duck/reducer";
import {HomeReducer} from "../Modules/Welcome/duck/reducer";
import {PhotoDetailReducer} from "../Modules/Photo/duck/reducer";


const reducers = combineReducers({
    login: LoginReducer,
    upload: UploadReducer,
    albums: AlbumReducer,
    table: TableReducer,
    groups: GroupReducer,
    orders: OrdersReducer,
    media: MediaReducer,
    photo_detail: PhotoDetailReducer,
    dashboard: DashboardReducer,
    home: HomeReducer
});


export default reducers;