import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiGet
} from '../../helper/axios';
import { GET_PAYMENT, GET_PRE_PACKAGE_PAYMENT } from '../type';


export const getPaymentByIdAction = (orderId) => {
  return (dispatch) => {
      return ApiGet(`/api/self-service/payment/${orderId}`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_PAYMENT,
          payload: res?.data,
        });
        return res?.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_PAYMENT,
        payload: error,
      });
    });
};
};

export const getPrePackagePaymentByIdAction = (orderId) => {
  return (dispatch) => {
      return ApiGet(`/api/pre-packaging/payment/${orderId}`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_PRE_PACKAGE_PAYMENT,
          payload: res?.data,
        });
        return res?.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_PRE_PACKAGE_PAYMENT,
        payload: error,
      });
    });
};
};