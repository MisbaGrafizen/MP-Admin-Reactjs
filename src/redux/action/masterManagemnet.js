import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostNoAuth,
    ApiPut,
} from '../../helper/axios';
import { ADD_PRAVRUTI, UPDATE_PRAVRUTI, GET_PRAVRUTI,ADD_KSHETRA,GET_KSHETRA,UPDATE_KSHETRA, ADD_DESIGNATION, GET_DESIGNATION, UPDATE_DESIGNATION, DELETE_PRAVRUTI } from '../type';


export const addPravrutiAction = (pravrutiData) => {
    return (dispatch) => {
        return ApiPost(`/api/admin/add_pravruti`, pravrutiData)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: ADD_PRAVRUTI,
            payload: res.data,
          });
          return res.data;
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
        return ApiPost(`/api/admin/add_kshetra`, kshetraData)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: ADD_KSHETRA,
            payload: res.data,
          });
          return res.data;
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
        return ApiPost(`/api/admin/add_designation`, designationData)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: ADD_DESIGNATION,
            payload: res.data,
          });
          return res.data;
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
      return ApiGet(`/api/admin/get_all_pravruti`)
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
        return ApiGet(`/api/admin/get_all_kshetra`)
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
        return ApiGet(`/api/admin/get_all_designation`)
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
        return ApiPut(`/api/admin/edit_pravruti/${updatePravrutiData._id}`, updatePravrutiData)
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
        return ApiPost(`/api/admin/edit_kshetra/${updateKshetraData._id}`, updateKshetraData)
      .then((res) => {
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
        return ApiPost(`/api/admin/edit_designation/${updateDesignationData._id}`, updateDesignationData)
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
      return ApiDelete(`/api/admin/delete_pravruti/${id}`)
    .then((res) => {
      if (res.status === 200) {
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
