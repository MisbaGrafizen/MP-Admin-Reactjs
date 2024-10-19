import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostNoAuth,
    ApiPut,
} from '../../helper/axios';
import { GET_FOOD_ITEM, ADD_FOOD_CATEGORY,GET_PRE_PACKAGE_FOOD_CATEGORY, ADD_PRE_PACKAGE_FOOD_CATEGORY,ADD_PRE_PACKAGE_FOOD_ITEM, GET_PRE_PACKAGE_FOOD_ITEM, ADD_FOOD_ITEM, GET_FOOD_CATEGORY, GET_SERVING_CATEGORY, ADD_SERVING_CATEGORY, GET_SERVING_METHOD, ADD_SERVING_METHOD} from '../type';


export const getAllFoodCategoryAction = () => {
    return (dispatch) => {
        return ApiGet(`/api/admin/foods`)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: GET_FOOD_CATEGORY,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_FOOD_CATEGORY,
          payload: error,
        });
      });
  };
};
export const getAllPrePackageFoodCategoryAction = () => {
  return (dispatch) => {
      return ApiGet(`/api/admin/prePackageFoods`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_PRE_PACKAGE_FOOD_CATEGORY,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_PRE_PACKAGE_FOOD_CATEGORY,
        payload: error,
      });
    });
};
};

export const getAllServingCategoryAction = () => {
  return (dispatch) => {
      return ApiGet(`/api/admin/servingCategories`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_SERVING_CATEGORY,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_SERVING_CATEGORY,
        payload: error,
      });
    });
};
};


export const addFoodCategoryAction = (foodData) => {
  return (dispatch) => {
      return ApiPost(`/api/admin/food`, foodData)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: ADD_FOOD_CATEGORY,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_FOOD_CATEGORY,
        payload: error,
      });
    });
};
};

export const addPrePackageFoodCategoryAction = (prePackageFoodData) => {
  return (dispatch) => {
      return ApiPost(`/api/admin/prePackageFood`, prePackageFoodData)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: ADD_PRE_PACKAGE_FOOD_CATEGORY,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_PRE_PACKAGE_FOOD_CATEGORY,
        payload: error,
      });
    });
};
};

export const addServingCategoryAction = (servingCategoryData) => {
  return (dispatch) => {
      return ApiPost(`/api/admin/servingCategory`, servingCategoryData)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: ADD_SERVING_CATEGORY,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_SERVING_CATEGORY,
        payload: error,
      });
    });
};
};

export const getFoodItemByCategoryIdAction = (foodId) => {
    return (dispatch) => {
        return ApiGet(`/api/admin/food-item/${foodId}`)
      .then((res) => {
        if (res.status === "success") {
          dispatch({
            type: GET_FOOD_ITEM,
            payload: res.data,
          });
          return res.data;
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_FOOD_ITEM,
          payload: error,
        });
      });
  };
};


export const getPrePackageFoodItemByCategoryIdAction = (foodId) => {
  return (dispatch) => {
      return ApiGet(`/api/admin/pre_package_food_item/${foodId}`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_PRE_PACKAGE_FOOD_ITEM,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_PRE_PACKAGE_FOOD_ITEM,
        payload: error,
      });
    });
};
};


export const getServingMethodByCategoryIdAction = (categoryId) => {
  return (dispatch) => {
      return ApiGet(`/api/admin/serving-method/${categoryId}`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_SERVING_METHOD,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_SERVING_METHOD,
        payload: error,
      });
    });
};
};


export const addFoodItemAction = (formData) => {
  return (dispatch) => {
      return ApiPost(`/api/admin/food-item`, formData)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: ADD_FOOD_ITEM,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_FOOD_ITEM,
        payload: error,
      });
    });
};
};


export const addPrePackageFoodItemAction = (formData) => {
  return (dispatch) => {
      return ApiPost(`/api/admin/pre_package_food_item`, formData)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: ADD_PRE_PACKAGE_FOOD_ITEM,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_PRE_PACKAGE_FOOD_ITEM,
        payload: error,
      });
    });
};
};


export const addServingMethodAction = (formData) => {
  return (dispatch) => {
      return ApiPost(`/api/admin/serving-method`, formData)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: ADD_SERVING_METHOD,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_SERVING_METHOD,
        payload: error,
      });
    });
};
};