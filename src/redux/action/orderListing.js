import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostNoAuth,
    ApiPut,
} from '../../helper/axios';
import { GET_PAID_ORDER_LIST, GET_UNPAID_ORDER_LIST } from '../type';

export const getAllUnpadiOrderListAction = () => {
  return (dispatch) => {
      return ApiGet(`/api/admin/get-order/unpaid`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_UNPAID_ORDER_LIST,
          payload: res?.data,
        });
        return res?.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_UNPAID_ORDER_LIST,
        payload: error,
      });
    });
};
};

export const getAllPadiOrderListAction = () => {
    return (dispatch) => {
        return ApiGet(`/api/admin/get-order/paid`)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: GET_PAID_ORDER_LIST,
            payload: res?.data,
          });
          return res?.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_PAID_ORDER_LIST,
          payload: error,
        });
      });
  };
  };