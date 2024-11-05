import { GET_PRAVRUTI, GET_KSHETRA, GET_DESIGNATION, ADD_PRAVRUTI, ADD_KSHETRA, ADD_DESIGNATION, UPDATE_PRAVRUTI, UPDATE_KSHETRA, UPDATE_DESIGNATION, RESET_GLOBAL_STATE, DELETE_PRAVRUTI, DELETE_KSHETRA, DELETE_DESIGNATION } from '../type';

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
                getPravruti: [...state.getPravruti, action.payload],
            };
        case ADD_KSHETRA:
            return {
                ...state,
                addKshetra: action.payload,
                getKshetra:[...state.getKshetra,action.payload]
            };
        case ADD_DESIGNATION:
            return {
                ...state,
                addDesignation: action.payload,
                getDesignation:[...state.getDesignation,action.payload]
            };
        case UPDATE_PRAVRUTI: {
            const updatedPravruti = action.payload; 
            return {
                ...state,
                getPravruti: state.getPravruti.map((pravruti) =>
                    pravruti._id === updatedPravruti._id ? updatedPravruti : pravruti
                ),
            };
          }
        case DELETE_PRAVRUTI: {
            const idToDelete = action.payload; 
            return {
                ...state,
                getPravruti: state.getPravruti.filter((pravruti) => pravruti._id !== idToDelete._id),
            };
          }
          
        case DELETE_KSHETRA: {
            const idToDelete = action.payload; 
            return {
                ...state,
                getKshetra: state.getKshetra.filter((pravruti) => pravruti._id !== idToDelete._id),
            };
          }
          
        case DELETE_DESIGNATION: {
            const idToDelete = action.payload; 
            return {
                ...state,
                getDesignation: state.getDesignation.filter((pravruti) => pravruti._id !== idToDelete._id),
            };
          }
          
        case UPDATE_KSHETRA:
            const updateKshetraData = action.payload;
            return {
                ...state,
                getKshetra:state.getKshetra.map((data) => data._id === updateKshetraData._id ? updateKshetraData : data)
            };
        case UPDATE_DESIGNATION:
            const updateDesignation = action.payload;
            return {
                ...state,
                getDesignation:state.getDesignation.map((data) =>data._id === updateDesignation._id ? updateDesignation : data)
            };
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default mastermanagementReducer;