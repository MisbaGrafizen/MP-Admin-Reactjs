import { GET_USER, ADD_USER, RESET_GLOBAL_STATE, LOGIN_ADMIN, DELETE_USER, UPDATE_USER, GET_ADMIN_USER, ADD_ADMIN_USER, EDIT_ADMIN_USER, DELETE_ADMIN_USER } from '../type';

const initialState = {
    addUser: [],
    getUser: [],
    loginAdmin:[],
    getAdminUser:[],
    addAdminUser:[],
    editAdmin:[],
    deleteAdmin:[]
};

const userMasterReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER: 
        return {
            ...state,
            getUser: action.payload,
        };
        case GET_ADMIN_USER: 
        return {
            ...state,
            getAdminUser: action.payload,
        };
        case EDIT_ADMIN_USER: 
        return {
            ...state,
            editAdmin: action.payload,
        };
        case DELETE_ADMIN_USER: 
        return {
            ...state,
            deleteAdmin: action.payload,
        };
        case LOGIN_ADMIN:
            return {
                ...state,
                loginAdmin :action.payload
            }
            case ADD_ADMIN_USER:
            return {
                ...state,
                addAdminUser: action.payload,
                getAdminUser:[...state.getUser,action.payload]
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