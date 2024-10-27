import { GET_PAYMENT, RESET_GLOBAL_STATE } from '../type';

const initialState = {
    GetPayment: [],
};

const paymentReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PAYMENT: 
        return {
            ...state,
            GetPayment: action.payload,
        };
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default paymentReducer;