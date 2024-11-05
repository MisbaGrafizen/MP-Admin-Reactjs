import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostNoAuth,
    ApiPut,
} from '../../helper/axios';
import { ADD_PREMVATI, DELETE_PREMVATI, GET_PREMVATI, UPDATE_PREMVATI } from '../type';


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

export const updatePremvatiAction = (id,imageData) => {
    return (dispatch) => {
        return ApiPut(`/api/admin/premvati/${id}`, imageData)
      .then((res) => {
        console.log("asdhfgjh",res)
        if (res.status === "success") {
          dispatch({
            type: UPDATE_PREMVATI,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_PREMVATI,
          payload: error,
        });
      });
  };
};
export const deletePremvatiAction = (id) => {
    return (dispatch) => {
        return ApiDelete(`/api/admin/premvati/${id}`,)
      .then((res) => {
        console.log("safsaf",res)
        if (res) {
          dispatch({
            type: DELETE_PREMVATI,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: DELETE_PREMVATI,
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