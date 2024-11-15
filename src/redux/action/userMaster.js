import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostData,
    ApiPostNoAuth,
    ApiPut,
} from '../../helper/axios';
import { ADD_ADMIN_USER, ADD_USER, DELETE_ADMIN_USER, DELETE_USER, EDIT_ADMIN_USER, GET_ADMIN_USER, GET_USER, LOGIN_ADMIN, UPDATE_USER } from '../type';


export const addUserAction = (userData) => {
    return (dispatch) => {
        return ApiPostData(`/api/user/add_user`, userData)
      .then((res) => {
        console.log("asghdfhga",res)
        if (res.status === "success") {
          dispatch({
            type: ADD_USER,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_USER,
          payload: error,
        });
      });
  };
};


export const getAdminUserAction = () => {
  return (dispatch) => {
      return ApiGet(`/api/admin/get_all_user`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_ADMIN_USER,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_ADMIN_USER,
        payload: error,
      });
    });
};
};


export const addAdminUserAction = (userData) => {
    return (dispatch) => {
        return ApiPostData(`/api/admin/add_user`, userData)
      .then((res) => {
       
        if (res.status === "success") {
          dispatch({
            type: ADD_ADMIN_USER,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_ADMIN_USER,
          payload: error,
        });
      });
  };
};

export const addEditUserAction = (userId,userData) => {
    return (dispatch) => {
        return ApiPut(`/api/admin/edit_user/${userId}`, userData)
      .then((res) => {
       
        if (res) {
          dispatch({
            type: EDIT_ADMIN_USER,
            payload: res,
          });
          return res;
        }
      })
      .catch((error) => {
        dispatch({
          type: EDIT_ADMIN_USER,
          payload: error,
        });
      });
  };
};

export const deleteAdminUserAction = (userId) => {
    return (dispatch) => {
        return ApiDelete(`/api/admin/delete_user/${userId}`)
      .then((res) => {
       
        if (res) {
          dispatch({
            type: DELETE_ADMIN_USER,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: DELETE_ADMIN_USER,
          payload: error,
        });
      });
  };
};

export const editUserAction = (id,userData) => {
    return (dispatch) => {
        return ApiPut(`/api/user/edit_user/${id}`, userData)
      .then((res) => {
        if (res) {
          dispatch({
            type: UPDATE_USER,
            payload: res,
          });
          return res;
        }
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_USER,
          payload: error,
        });
      });
  };
};

export const loginAdminAction = (userData) => {
    return (dispatch) => {
        return ApiPostData(`/api/admin/login`, userData)
      .then((res) => {
        console.log("dsfsf",res)
        if (res.token) {
          dispatch({
            type: LOGIN_ADMIN,
            payload: res,
          });
          return res;
        }
      })
      .catch((error) => {
        dispatch({
          type: LOGIN_ADMIN,
          payload: error,
        });
        return error;
      });
  };
};

export const getUserAction = () => {
  return (dispatch) => {
      return ApiGet(`/api/user/get_all_user`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_USER,
        payload: error,
      });
    });
};
};


export const DeleteUserMasterAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/api/user/delete_user/${id}`)
    .then((res) => {
      console.log("dgsrsjdtedreh",res)
      if (res) {
        console.log("saddfsdfdsadafa",res)
        dispatch({
          type: DELETE_USER,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_USER,
        payload: error,
      });
    });
};
};