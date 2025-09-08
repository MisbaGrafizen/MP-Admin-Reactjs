import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostNoAuth,
    ApiPut,
} from '../../helper/axios';
import { GET_PAID_ORDER_LIST, GET_UNPAID_ORDER_LIST, ACCEPT_BULK_ORDER, GET_PAID_BULK_ORDER, GET_BULK_CANCEL_ORDER, GET_PAID_BULK_ORDER_LIST, GET_UNPAID_BULK_ORDER_LIST, GET_PRE_PACKAGE_UNPAID_ORDER_LIST, GET_PRE_PACKAGE_PAID_ORDER_LIST, GET_PAID_ORDER, GET_PRE_PAID_ORDER,GET_CANCEL_ORDER, GET_PRE_CANCEL_ORDER } from '../type';

export const getAllUnpaidOrderListAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/get-order/unpaid`)
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

export const getAllPaidOrderListAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/get-pre-package-order/paid`)
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
        return ApiGet(`/admin/get-pre-package-order/unpaid`)
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
          return ApiGet(`/admin/get-order/paid`)
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
          return ApiPut(`/self-service/order-receipt/${orderId}`)
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

    export const updateBulkOrderRecieptToPaidAction = (orderId) => {
      return (dispatch) => {
          return ApiPut(`/bulk-order/order-receipt/${orderId}`)
        .then((res) => {
          if (res.status === "success") {
            dispatch({
              type: GET_PAID_BULK_ORDER,
              payload: res?.data,
            });
            return res?.data;
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_PAID_BULK_ORDER,
            payload: error,
          });
        });
    };
    };

    
    export const updateBulkOrderRecieptToAcceptAction = (orderId) => {
      return (dispatch) => {
          return ApiPut(`/bulk-order/order-receipt/accept/${orderId}`)
        .then((res) => {
          if (res.status === "success") {
            dispatch({
              type: ACCEPT_BULK_ORDER,
              payload: res?.data,
            });
            return res?.data;
          }
        })
        .catch((error) => {
          dispatch({
            type: ACCEPT_BULK_ORDER,
            payload: error,
          });
        });
    };
    };


    export const updatePrePackageOrderRecieptToPaidAction = (orderId) => {
      return (dispatch) => {
          return ApiPut(`/pre-packaging/order-receipt/${orderId}`)
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
          return ApiPut(`/self-service/order-receipt/cancel/${orderId}`)
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
          return ApiPut(`/pre-packaging/order-receipt/cancel/${orderId}`)
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

    export const updateBulkOrderRecieptToCancelAction = (orderId) => {
      return (dispatch) => {
          return ApiPut(`/bulk-order/order-receipt/cancel/${orderId}`)
        .then((res) => {
          if (res.status === "success") {
            dispatch({
              type: GET_BULK_CANCEL_ORDER,
              payload: res?.data,
            });
            return res?.data;
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_BULK_CANCEL_ORDER,
            payload: error,
          });
        });
    };
    };

    export const getAllUnpaidBulkOrderListAction = () => {
      return (dispatch) => {
          return ApiGet(`/admin/get-bulk-order/unpaid`)
        .then((res) => {
          if (res.status === "success") {
            dispatch({
              type: GET_UNPAID_BULK_ORDER_LIST,
              payload: res?.data,
            });
            return res?.data;
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_UNPAID_BULK_ORDER_LIST,
            payload: error,
          });
        });
    };
    };
    
    export const getAllPaidBulkOrderListAction = () => {
        return (dispatch) => {
            return ApiGet(`/admin/get-bulk-order/paid`)
          .then((res) => {
            if (res.status === "success") {
              dispatch({
                type: GET_PAID_BULK_ORDER_LIST,
                payload: res?.data,
              });
              return res?.data;
            }
          })
          .catch((error) => {
            dispatch({
              type: GET_PAID_BULK_ORDER_LIST,
              payload: error,
            });
          });
      };
      };