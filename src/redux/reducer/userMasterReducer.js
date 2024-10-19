import { GET_USER, ADD_USER, RESET_GLOBAL_STATE } from '../type';

const initialState = {
    addUser: [],
    getUser: [],
};

const userMasterReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER: 
        return {
            ...state,
            getUser: action.payload,
        };
        case ADD_USER:
            return {
                ...state,
                addUser: action.payload,
            }

        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default userMasterReducer;