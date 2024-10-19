import { GET_PRAVRUTI, GET_KSHETRA, GET_DESIGNATION, ADD_PRAVRUTI, ADD_KSHETRA, ADD_DESIGNATION, UPDATE_PRAVRUTI, UPDATE_KSHETRA, UPDATE_DESIGNATION, RESET_GLOBAL_STATE } from '../type';

const initialState = {
    addPravruti: [],
    getPravruti: [],
    updatePravruti: [],
    addKshetra: [],
    getKshetra: [],
    updateKshetra: [],
    addDesignation: [],
    getDesignation: [],
    updateDesignation: [],
};

const mastermanagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRAVRUTI:
            return {
                ...state,
                getPravruti: action.payload,
            };
        case GET_KSHETRA:
            return {
                ...state,
                getKshetra: action.payload,
            };
        case GET_DESIGNATION:
            return {
                ...state,
                getDesignation: action.payload,
            };
        case ADD_PRAVRUTI:
            return {
                ...state,
                addPravruti: action.payload,
            };
        case ADD_KSHETRA:
            return {
                ...state,
                addKshetra: action.payload,
            };
        case ADD_DESIGNATION:
            return {
                ...state,
                addDesignation: action.payload,
            };
        case UPDATE_PRAVRUTI:
            return {
                ...state,
                updatePravruti: action.payload,
            };
        case UPDATE_KSHETRA:
            return {
                ...state,
                updateKshetra: action.payload,
            };
        case UPDATE_DESIGNATION:
            return {
                ...state,
                updateDesignation: action.payload,
            };
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default mastermanagementReducer;