import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostNoAuth,
    ApiPut,
} from '../../helper/axios';
import { GET_PAID_ORDER_LIST, GET_UNPAID_ORDER_LIST, GET_PRE_PACKAGE_UNPAID_ORDER_LIST, GET_PRE_PACKAGE_PAID_ORDER_LIST, GET_PAID_ORDER, GET_PRE_PAID_ORDER,GET_CANCEL_ORDER, GET_PRE_CANCEL_ORDER } from '../type';

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
        return ApiGet(`/api/admin/get-pre-package-order/paid`)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: GET_PRE_PACKAGE_PAID_ORDER_LIST,
            payload: res?.data,
          });
          return res?.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_PRE_PACKAGE_PAID_ORDER_LIST,
          payload: error,
        });
      });
  };
  };

  export const getAllPrePackageUnpadiOrderListAction = () => {
    return (dispatch) => {
        return ApiGet(`/api/admin/get-pre-package-order/unpaid`)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: GET_PRE_PACKAGE_UNPAID_ORDER_LIST,
            payload: res?.data,
          });
          return res?.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_PRE_PACKAGE_UNPAID_ORDER_LIST,
          payload: error,
        });
      });
  };
  };
  
  export const getAllPrePackagePadiOrderListAction = () => {
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

    export const updateOrderRecieptToPaidAction = (orderId) => {
      return (dispatch) => {
          return ApiPut(`/api/self-service/order-receipt/${orderId}`)
        .then((res) => {
          if (res.status === "success") {
            dispatch({
              type: GET_PAID_ORDER,
              payload: res?.data,
            });
            return res?.data;
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_PAID_ORDER,
            payload: error,
          });
        });
    };
    };


    export const updatePrePackageOrderRecieptToPaidAction = (orderId) => {
      return (dispatch) => {
          return ApiPut(`/api/pre-packaging/order-receipt/${orderId}`)
        .then((res) => {
          if (res.status === "success") {
            dispatch({
              type: GET_PRE_PAID_ORDER,
              payload: res?.data,
            });
            return res?.data;
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_PRE_PAID_ORDER,
            payload: error,
          });
        });
    };
    };


    export const updateOrderRecieptToCancelAction = (orderId) => {
      return (dispatch) => {
          return ApiPut(`/api/self-service/order-receipt/cancel/${orderId}`)
        .then((res) => {
          if (res.status === "success") {
            dispatch({
              type: GET_CANCEL_ORDER,
              payload: res?.data,
            });
            return res?.data;
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_CANCEL_ORDER,
            payload: error,
          });
        });
    };
    };

    export const updatePrePackageOrderRecieptToCancelAction = (orderId) => {
      return (dispatch) => {
          return ApiPut(`/api/pre-packaging/order-receipt/cancel/${orderId}`)
        .then((res) => {
          if (res.status === "success") {
            dispatch({
              type: GET_PRE_CANCEL_ORDER,
              payload: res?.data,
            });
            return res?.data;
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_PRE_CANCEL_ORDER,
            payload: error,
          });
        });
    };
    };