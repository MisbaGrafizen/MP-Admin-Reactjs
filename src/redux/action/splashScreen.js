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
import { ADD_SPLASH_IMAGE, GET_SPLASH_IMAGE } from '../type';


export const addSplashScreenImageAction = (imageData) => {
  console.log("ssdsds",imageData)
    return (dispatch) => {
        return ApiPostData(`/admin/add_image`, imageData)
      .then((res) => {
        console.log("sdfsdres",res)
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

export const getSplashScreenImageAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/get_all_images`)
    .then((res) => {
      if (res) {
        dispatch({
          type: GET_SPLASH_IMAGE,
          payload: res,
        });
        return res;
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