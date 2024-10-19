import { ADD_SPLASH_IMAGE, GET_SPLASH_IMAGE, RESET_GLOBAL_STATE } from '../type';

const initialState = {
    addSplashScreen: [],
    getSplashScreen: [],
};

const splashScreenReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_SPLASH_IMAGE: 
        return {
            ...state,
            addSplashScreen: action.payload,
        };
        case GET_SPLASH_IMAGE:
            return {
                ...state,
                getSplashScreen: action.payload,
            }

        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default splashScreenReducer;