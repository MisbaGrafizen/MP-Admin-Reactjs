import { GET_PAYMENT, GET_PRE_PACKAGE_PAYMENT, RESET_GLOBAL_STATE } from '../type';

const initialState = {
    getPayment: [],
    getPrePackagePayment: [],
};

const paymentReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PAYMENT: 
        return {
            ...state,
            getPayment: action.payload,
        };
        case GET_PRE_PACKAGE_PAYMENT: 
        return {
            ...state,
            getPrePackagePayment: action.payload,
        };
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default paymentReducer;