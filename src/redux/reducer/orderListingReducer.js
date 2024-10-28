import { GET_UNPAID_ORDER_LIST, GET_PAID_ORDER_LIST, GET_PRE_PACKAGE_PAID_ORDER_LIST, GET_PRE_PACKAGE_UNPAID_ORDER_LIST, RESET_GLOBAL_STATE } from '../type';

const initialState = {
    getPaidOrderList: [],
    getUnpaidOrderList: [],
    getPrePackagePaidOrderList: [],
    getPrePackageUnpaidOrderList: [],
};

const orderListingReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_UNPAID_ORDER_LIST: 
        return {
            ...state,
            getUnpaidOrderList: action.payload,
        };
        case GET_PAID_ORDER_LIST:
            return {
                ...state,
                getPaidOrderList: action.payload,
            };
        case GET_PRE_PACKAGE_PAID_ORDER_LIST: 
        return {
            ...state,
            getPrePackagePaidOrderList: action.payload,
        };
        case GET_PRE_PACKAGE_UNPAID_ORDER_LIST: 
        return {
            ...state,
            getPrePackageUnpaidOrderList: action.payload,
        };
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default orderListingReducer;