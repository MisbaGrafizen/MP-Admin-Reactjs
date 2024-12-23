import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostNoAuth,
    ApiPut,
} from '../../helper/axios';
import { ADD_PRAVRUTI, UPDATE_PRAVRUTI, GET_PRAVRUTI,ADD_KSHETRA,GET_KSHETRA,UPDATE_KSHETRA, ADD_DESIGNATION, GET_DESIGNATION, UPDATE_DESIGNATION, DELETE_PRAVRUTI, DELETE_KSHETRA, DELETE_DESIGNATION } from '../type';


export const addPravrutiAction = (pravrutiData) => {
    return (dispatch) => {
        return ApiPost(`/admin/add_pravruti`, pravrutiData)
      .then((res) => {
        if (res.data.status === "success") {
          dispatch({
            type: ADD_PRAVRUTI,
            payload: res.data.data,
          });
          return res.data.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_PRAVRUTI,
          payload: error,
        });
      });
  };
};

export const addKshetraAction = (kshetraData) => {
    return (dispatch) => {
        return ApiPost(`/admin/add_kshetra`, kshetraData)
      .then((res) => {
        if (res.data.status === "success") {
          dispatch({
            type: ADD_KSHETRA,
            payload: res.data.data,
          });
          return res.data.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_KSHETRA,
          payload: error,
        });
      });
  };
};

export const addDesignationAction = (designationData) => {
    return (dispatch) => {
        return ApiPost(`/admin/add_designation`, designationData)
      .then((res) => {
        if (res.data.status === "success") {
          dispatch({
            type: ADD_DESIGNATION,
            payload: res.data.data,
          });
          return res.data.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: ADD_DESIGNATION,
          payload: error,
        });
      });
  };
};

export const getPravrutiAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/get_all_pravruti`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_PRAVRUTI,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_PRAVRUTI,
        payload: error,
      });
    });
};
};

export const getKshetraAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/get_all_kshetra`)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: GET_KSHETRA,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_KSHETRA,
          payload: error,
        });
      });
  };
  };

  export const getDesignationAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/get_all_designation`)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: GET_DESIGNATION,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_DESIGNATION,
          payload: error,
        });
      });
  };
  };

export const updatePravrutiAction = (updatePravrutiData) => {
    return (dispatch) => {
        return ApiPut(`/admin/edit_pravruti/${updatePravrutiData._id}`, updatePravrutiData)
      .then((res) => {
        if (res.status === "success") {
          console.log("saddsadafa",res.data)
          dispatch({
            type: UPDATE_PRAVRUTI,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_PRAVRUTI,
          payload: error,
        });
      });
  };
};

export const updateKshetraAction = (updateKshetraData) => {
    return (dispatch) => {
        return ApiPut(`/admin/edit_kshetra/${updateKshetraData._id}`, updateKshetraData)
      .then((res) => {
        console.log("sdfdsres",res)
        if (res.status === "success") {
          dispatch({
            type: UPDATE_KSHETRA,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_KSHETRA,
          payload: error,
        });
      });
  };
};

export const updateDesignationAction = (updateDesignationData) => {
    return (dispatch) => {
        return ApiPut(`/admin/edit_designation/${updateDesignationData._id}`, updateDesignationData)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: UPDATE_DESIGNATION,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_DESIGNATION,
          payload: error,
        });
      });
  };
};


export const DeletePravrutiAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/delete_pravruti/${id}`)
    .then((res) => {
      console.log("dgsrsjdtedreh",res)
      if (res) {
        console.log("saddfsdfdsadafa",res)
        dispatch({
          type: DELETE_PRAVRUTI,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_PRAVRUTI,
        payload: error,
      });
    });
};
};

export const DeleteKshetraAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/delete_kshetra/${id}`)
    .then((res) => {
      console.log("dgsrsjdtedreh",res)
      if (res) {
        console.log("saddfsdfdsadafa",res)
        dispatch({
          type: DELETE_KSHETRA,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_KSHETRA,
        payload: error,
      });
    });
};
};

export const DeleteDesignationsAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/delete_designation/${id}`)
    .then((res) => {
      console.log("dgsrsjdtedreh",res)
      if (res) {
        console.log("saddfsdfdsadafa",res)
        dispatch({
          type: DELETE_DESIGNATION,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: DELETE_DESIGNATION,
        payload: error,
      });
    });
};
};
