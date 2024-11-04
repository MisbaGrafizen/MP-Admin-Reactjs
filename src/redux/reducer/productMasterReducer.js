import { GET_FOOD_CATEGORY, GET_FOOD_ITEM, ADD_FOOD_CATEGORY, ADD_FOOD_ITEM, ADD_SERVING_METHOD, GET_SERVING_METHOD, GET_SERVING_CATEGORY, ADD_SERVING_CATEGORY, RESET_GLOBAL_STATE, GET_PRE_PACKAGE_FOOD_CATEGORY, GET_PRE_PACKAGE_FOOD_ITEM, ADD_PRE_PACKAGE_FOOD_CATEGORY, ADD_PRE_PACKAGE_FOOD_ITEM } from '../type';

const initialState = {
    getAllFoodCategory: [],
    getFoodItemByFoodCategory: [],
    addFoodCategory: [],
    addFoodItem: [],
    addServingCategory: [],
    getServingCategory: [],
    addServingMethod: [],
    getServingMethod: [],
    getPrePackageFoodCategory:[],
    getPrePackageFoodItemByFoodCategory:[],
    addPrePackageFoodCategory:[],
    addPrePackageFoodItem:[]
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
        case ADD_PRE_PACKAGE_FOOD_CATEGORY: 
            return {
                ...state,
                addPrePackageFoodCategory: action.payload,
            };
        case GET_FOOD_ITEM: 
        return {
            ...state,
            getFoodItemByFoodCategory: action.payload,
        };
        case GET_PRE_PACKAGE_FOOD_ITEM: 
        return {
            ...state,
            getPrePackageFoodItemByFoodCategory:action.payload
        }
        case ADD_FOOD_ITEM:
            return {
                ...state,
                addFoodItem: action.payload,
            };
        case ADD_PRE_PACKAGE_FOOD_ITEM:
            return {
                ...state,
                addPrePackageFoodItem:action.payload
            }
        case GET_SERVING_CATEGORY:
            return {
                ...state,
                getServingCategory: action.payload,
            };
        case GET_PRE_PACKAGE_FOOD_CATEGORY:
            return {
                ...state,
                getPrePackageFoodCategory: action.payload,
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