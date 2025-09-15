import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostNoAuth,
    ApiPut,
} from '../../helper/axios';
import { GET_PAID_ORDER_LIST, GET_UNPAID_ORDER_LIST, GET_PENDING_BULK_ORDER_LIST, GET_PRE_PACKAGE_PENDING_ORDER_LIST, GET_PENDING_ORDER_LIST, GET_PRE_PENDING_ORDER, ACCEPT_BULK_ORDER, GET_PAID_BULK_ORDER, GET_BULK_CANCEL_ORDER, GET_PAID_BULK_ORDER_LIST, GET_UNPAID_BULK_ORDER_LIST, GET_PRE_PACKAGE_UNPAID_ORDER_LIST, GET_PRE_PACKAGE_PAID_ORDER_LIST, GET_PAID_ORDER, GET_PENDING_ORDER, GET_PRE_PAID_ORDER,GET_CANCEL_ORDER, GET_PRE_CANCEL_ORDER } from '../type';

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

export const getAllPrePackagePaidOrderListAction = () => {
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

  export const getAllPrePackagePendingOrderListAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/get-pre-package-order/pending`)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: GET_PRE_PACKAGE_PENDING_ORDER_LIST,
            payload: res?.data,
          });
          return res?.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_PRE_PACKAGE_PENDING_ORDER_LIST,
          payload: error,
        });
      });
  };
  };

  export const getAllPrePackageUnpaidOrderListAction = () => {
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
  
  export const getAllPaidOrderListAction = () => {
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

     export const getAllPendingOrderListAction = () => {
      return (dispatch) => {
          return ApiGet(`/admin/get-order/pending`)
        .then((res) => {
          if (res.status === "success") {
            dispatch({
              type: GET_PENDING_ORDER_LIST,
              payload: res?.data,
            });
            return res?.data;
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_PENDING_ORDER_LIST,
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

        export const updateOrderRecieptToPendingAction = (orderId, data) => {
      return (dispatch) => {
        console.log('data', data)
          return ApiPut(`/self-service/order-receipt/pending/${orderId}`, data)
        .then((res) => {
          console.log('res', res)
          if (res.status === "success") {
            dispatch({
              type: GET_PENDING_ORDER,
              payload: res?.data,
            });
            return res?.data;
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_PENDING_ORDER,
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

    
  export const updatePrePackageOrderRecieptToPendingAction = (orderId, data) => {
  return (dispatch) => {
    console.log("➡️ sending data", data);

    return ApiPut(`/pre-packaging/order-receipt/pending/${orderId}`, data)
      .then((res) => {
        if (res.status === "success") {
          // Take backend data (if any) and overlay frontend values
          const patched = {
            ...(res?.data || {}),   // backend data
            ...data,                // always trust what we sent
            orderType: "pending",   // force status
          };

          console.log("✅ patched data for Redux:", patched);

          dispatch({
            type: GET_PRE_PENDING_ORDER,
            payload: patched,
          });

          return patched;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_PRE_PENDING_ORDER,
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


          export const getAllPendingBulkOrderListAction = () => {
        return (dispatch) => {
            return ApiGet(`/admin/get-bulk-order/pending`)
          .then((res) => {
            if (res.status === "success") {
              dispatch({
                type: GET_PENDING_BULK_ORDER_LIST,
                payload: res?.data,
              });
              return res?.data;
            }
          })
          .catch((error) => {
            dispatch({
              type: GET_PENDING_BULK_ORDER_LIST,
              payload: error,
            });
          });
      };
      };