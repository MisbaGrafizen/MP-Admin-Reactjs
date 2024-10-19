import { GET_FOOD_CATEGORY, GET_FOOD_ITEM, ADD_FOOD_CATEGORY, ADD_FOOD_ITEM, ADD_SERVING_METHOD, GET_SERVING_METHOD, GET_SERVING_CATEGORY, ADD_SERVING_CATEGORY, RESET_GLOBAL_STATE } from '../type';

const initialState = {
    getAllFoodCategory: [],
    getFoodItemByFoodCategory: [],
    addFoodCategory: [],
    addFoodItem: [],
    addServingCategory: [],
    getServingCategory: [],
    addServingMethod: [],
    getServingMethod: [],
};

const productMasterReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_FOOD_CATEGORY: 
        return {
            ...state,
            getAllFoodCategory: action.payload,
        };
        case ADD_FOOD_CATEGORY: 
            return {
                ...state,
                addFoodCategory: action.payload,
            };
        case GET_FOOD_ITEM: 
        return {
            ...state,
            getFoodItemByFoodCategory: action.payload,
        };
        case ADD_FOOD_ITEM:
            return {
                ...state,
                addFoodItem: action.payload,
            };
        case GET_SERVING_CATEGORY:
            return {
                ...state,
                getServingCategory: action.payload,
            };
        case ADD_SERVING_CATEGORY: 
            return {
                ...state,
                addServingCategory: action.payload,
            };
        case GET_SERVING_METHOD:
            return {
                ...state,
                getServingMethod: action.payload,
            };
        case ADD_SERVING_METHOD:
            return {
                ...state,
                addServingMethod: action.payload,
            };
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default productMasterReducer;