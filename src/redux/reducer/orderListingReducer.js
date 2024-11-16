import { GET_UNPAID_ORDER_LIST, GET_PAID_ORDER_LIST, GET_PRE_PACKAGE_PAID_ORDER_LIST, GET_PRE_PACKAGE_UNPAID_ORDER_LIST, GET_PAID_ORDER, GET_PRE_PAID_ORDER, GET_PRE_CANCEL_ORDER, GET_CANCEL_ORDER, RESET_GLOBAL_STATE } from '../type';

const initialState = {
    getPaidOrderList: [],
    getUnpaidOrderList: [],
    getPrePackagePaidOrderList: [],
    getPrePackageUnpaidOrderList: [],
    updateSelfServingOrder: [],
    updatePrePackageOrder: [],
    cancelSelfServingOrder: [],
    cancelPrePackageOrder: [],
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
        case GET_PAID_ORDER: 
        return {
            ...state,
            updateSelfServingOrder: action.payload,
        };
        case GET_PRE_PAID_ORDER: 
        return {
            ...state,
            updatePrePackageOrder: action.payload,
        };
        case GET_PRE_CANCEL_ORDER:
        return {
                ...state,
                cancelPrePackageOrder: action.payload,
        };
        case GET_CANCEL_ORDER: 
        return {
            ...state,
            updateSelfServingOrder: action.payload,
        };
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default orderListingReducer;