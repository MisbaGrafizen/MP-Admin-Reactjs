import { GET_PREMVATI, ADD_PREMVATI, RESET_GLOBAL_STATE, UPDATE_PREMVATI, DELETE_PREMVATI } from '../type';

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
        case UPDATE_PREMVATI :
            const data = action.payload;
            return{
                ...state,
                getPremvati:state.getPremvati.map((item => item._id === data?._id ? data : item))
               
            }
        case DELETE_PREMVATI:
            const dataId = action.payload;
            return {
                ...state,
                getPremvati:state.getPremvati.filter((item => item._id !== dataId._id))
            }
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default premvatiListReducer;