import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostNoAuth,
    ApiPut,
} from '../../helper/axios';
import { ADD_USER, GET_USER } from '../type';


export const addUserAction = (userData) => {
    return (dispatch) => {
        return ApiPost(`/api/user/add_user`, userData)
      .then((res) => {
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