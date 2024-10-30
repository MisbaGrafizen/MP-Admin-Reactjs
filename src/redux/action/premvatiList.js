import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostNoAuth,
    ApiPut,
} from '../../helper/axios';
import { ADD_PREMVATI, GET_PREMVATI } from '../type';


export const addPremvatiAction = (imageData) => {
    return (dispatch) => {
        return ApiPost(`/api/admin/premvati`, imageData)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: ADD_PREMVATI,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_PREMVATI,
          payload: error,
        });
      });
  };
};

export const getPremvatiAction = () => {
  return (dispatch) => {
      return ApiGet(`/api/admin/premvati`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_PREMVATI,
          payload: res?.data,
        });
        return res?.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_PREMVATI,
        payload: error,
      });
    });
};
};