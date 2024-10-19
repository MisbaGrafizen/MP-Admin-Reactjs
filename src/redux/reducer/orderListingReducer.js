import { GET_UNPAID_ORDER_LIST, GET_PAID_ORDER_LIST, RESET_GLOBAL_STATE } from '../type';

const initialState = {
    getPaidOrderList: [],
    getUnpaidOrderList: [],
};

const orderListingReducer = (state = initialState, action) => {
    // console.log('action.payload', action?.payload);
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
            }

        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default orderListingReducer;