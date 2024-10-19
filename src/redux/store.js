import { applyMiddleware, combineReducers, createStore} from "redux";
import { thunk } from "redux-thunk";
import splashScreenReducer from "./reducer/splashScreenReducer";
import premvatiListReducer from "./reducer/premvatiListReducer";
import mastermanagementReducer from "./reducer/masterManagementReducer";
import userMasterReducer from "./reducer/userMasterReducer";
import productMasterReducer from "./reducer/productMasterReducer";
import orderListingReducer from "./reducer/orderListingReducer";




const rootReducer = combineReducers({
   splashScreenState: splashScreenReducer,
   premvatiListState: premvatiListReducer,
   mastermanagementState: mastermanagementReducer,
   userMasterState: userMasterReducer,
   productMasterState: productMasterReducer,
   orderListingState: orderListingReducer,
});

const store = createStore(rootReducer,window.REDUX_DEVTOOLS_EXTENSION_COMPOSE && Window.__REDUX_DEVTOOLS_EXTENSION_(), applyMiddleware(thunk));

export default store;