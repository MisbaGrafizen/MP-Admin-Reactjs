import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostNoAuth,
    ApiPut,
} from '../../helper/axios';
import { ADD_SPLASH_IMAGE, GET_SPLASH_IMAGE } from '../type';


export const addSplashScreenImageAction = (imageData) => {
    return (dispatch) => {
        return ApiPost(`/api/admin/add_image`, imageData)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: ADD_SPLASH_IMAGE,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_SPLASH_IMAGE,
          payload: error,
        });
      });
  };
};

export const getSplashScreenImageAction = (imageData) => {
  return (dispatch) => {
      return ApiGet(`/api/admin/get_all_images`, imageData)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_SPLASH_IMAGE,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_SPLASH_IMAGE,
        payload: error,
      });
    });
};
};