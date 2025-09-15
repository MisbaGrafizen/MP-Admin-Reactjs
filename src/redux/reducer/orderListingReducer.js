import { GET_UNPAID_ORDER_LIST, GET_PENDING_ORDER_LIST, GET_PENDING_BULK_ORDER_LIST, GET_PRE_PENDING_ORDER, GET_PENDING_ORDER, GET_PRE_PACKAGE_PENDING_ORDER_LIST, ACCEPT_BULK_ORDER, GET_PAID_BULK_ORDER_LIST, GET_PAID_ORDER_LIST, GET_UNPAID_BULK_ORDER_LIST, GET_BULK_CANCEL_ORDER, GET_PAID_BULK_ORDER, GET_PRE_PACKAGE_PAID_ORDER_LIST, GET_PRE_PACKAGE_UNPAID_ORDER_LIST, GET_PAID_ORDER, GET_PRE_PAID_ORDER, GET_PRE_CANCEL_ORDER, GET_CANCEL_ORDER, RESET_GLOBAL_STATE } from '../type';

const initialState = {
    getPaidOrderList: [],
    getUnpaidOrderList: [],
    getPendingOrderList: [],
    getPrePackagePaidOrderList: [],
    getPrePackagePendingOrderList: [],
    getPrePackageUnpaidOrderList: [],
    updateSelfServingOrder: [],
    updateSelfServingPendingOrder: [],
    updatePrePackageOrder: [],
    updatePrePackagePendingOrder: [],
    cancelSelfServingOrder: [],
    cancelPrePackageOrder: [],
    cancelBulkOrder: [],
    updateBulkOrder: [],
    getBulkPaidOrderList: [],
    getBulkPendingOrderList: [],
    getBulkUnpaidOrderList: [],
    acceptBulkOrder: [],
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
         case GET_PENDING_ORDER_LIST:
            return {
                ...state,
                getPendingOrderList: action.payload,
            };
        case ACCEPT_BULK_ORDER:
            return {
                ...state,
                acceptBulkOrder: action.payload,
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
        case GET_PRE_PACKAGE_PENDING_ORDER_LIST: 
        return {
            ...state,
            getPrePackagePendingOrderList: action.payload,
        };
        case GET_PAID_BULK_ORDER_LIST:
            return {
                ...state,
                getBulkPaidOrderList: action.payload,
        };
         case GET_PENDING_BULK_ORDER_LIST:
            return {
                ...state,
                getBulkPendingOrderList: action.payload,
        };
        case GET_UNPAID_BULK_ORDER_LIST: 
        return {
            ...state,
            getBulkUnpaidOrderList: action.payload,
        }
        case GET_PAID_ORDER: 
        return {
            ...state,
            updateSelfServingOrder: action.payload,
        };
        case GET_PENDING_ORDER: 
        return {
            ...state,
            updateSelfServingPendingOrder: action.payload,
        };
        case GET_BULK_CANCEL_ORDER:
            return {
                ...state,
                updateBulkOrder: action.payload,
        };
        case GET_PAID_BULK_ORDER: 
            return{
                ...state,
                cancelBulkOrder: action.payload,
        };
        case GET_PRE_PAID_ORDER: 
        return {
            ...state,
            updatePrePackageOrder: action.payload,
        };
        case GET_PRE_PENDING_ORDER: 
        return {
            ...state,
            updatePrePackagePendingOrder: action.payload,
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