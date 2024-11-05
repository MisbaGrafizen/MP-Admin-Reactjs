import { GET_USER, ADD_USER, RESET_GLOBAL_STATE, LOGIN_ADMIN, DELETE_USER, UPDATE_USER } from '../type';

const initialState = {
    addUser: [],
    getUser: [],
    loginAdmin:[]
};

const userMasterReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER: 
        return {
            ...state,
            getUser: action.payload,
        };
        case LOGIN_ADMIN:
            return {
                ...state,
                loginAdmin :action.payload
            }
            case ADD_USER:
            return {
                ...state,
                addUser: action.payload,
                getUser:[...state.getUser,action.payload]
            }
        case UPDATE_USER:
            const editUserData = action.payload;
            return {
                ...state,
                getUser:state.getUser.map((item => item._id === editUserData._id ? editUserData: item))
            }
        case DELETE_USER :
            const deleteUserData = action.payload;
            return {
                ...state,
                getUser:state.getUser.filter(item => item._id !== deleteUserData._id)
            }
        case RESET_GLOBAL_STATE:
            return initialState;
        default:
            return state;
    }
};

export default userMasterReducer;