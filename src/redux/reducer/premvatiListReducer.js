import { GET_PREMVATI, ADD_PREMVATI, RESET_GLOBAL_STATE } from '../type';

const initialState = {
    addPremvati: [],
    getPremvati: [],
};

const premvatiListReducer = (state = initialState, action) => {
    // console.log('action.payload', action?.payload);
    switch(action.type) {
        case GET_PREMVATI: 
        return {
            ...state,
            getPremvati: action.payload,
        };
        case ADD_PREMVATI:
            return {
                ...state,
                addPremvati: action.payload,
            }

        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default premvatiListReducer;