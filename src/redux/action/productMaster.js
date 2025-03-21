import { toast } from 'react-toastify';
import Auth from '../../config/auth';
import {
    ApiDelete,
    ApiGet,
    ApiPost,
    ApiPostData,
    ApiPostNoAuth,
    ApiPut,
    ApiPutWithId,
} from '../../helper/axios';
import { GET_FOOD_ITEM, ADD_CATEGORY, GET_CATEGORY, ADD_ITEM, GET_ITEM,  ADD_FOOD_CATEGORY,GET_PRE_PACKAGE_FOOD_CATEGORY, GET_BULK_ORDER_CATEGORY, ADD_PRE_PACKAGE_FOOD_CATEGORY,ADD_PRE_PACKAGE_FOOD_ITEM, ADD_BULK_ORDER_CATEGORY, GET_PRE_PACKAGE_FOOD_ITEM, ADD_FOOD_ITEM, GET_FOOD_CATEGORY, GET_SERVING_CATEGORY, ADD_SERVING_CATEGORY, GET_SERVING_METHOD, GET_BULK_ORDER_ITEM, ADD_BULK_ORDER_ITEM, ADD_SERVING_METHOD} from '../type';


export const getAllFoodCategoryAction = () => {
    return (dispatch) => {
        return ApiGet(`/admin/foods`)
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
      return ApiGet(`/admin/prePackageFoods`)
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


export const getBulkOrderFoodCategoryAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/bulkOrderCategories`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_BULK_ORDER_CATEGORY,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_BULK_ORDER_CATEGORY,
        payload: error,
      });
    });
};
};

export const getCategoryAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/categories`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_CATEGORY,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_CATEGORY,
        payload: error,
      });
    });
};
};

export const getAllServingCategoryAction = () => {
  return (dispatch) => {
      return ApiGet(`/admin/servingCategories`)
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
      return ApiPostData(`/admin/food`, foodData)
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
      return ApiPostData(`/admin/prePackageFood`, prePackageFoodData)
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

export const addBulkOrderCategoryAction = (bulkOrderFoodData) => {
  return (dispatch) => {
      return ApiPostData(`/admin/bulkOrderCategory`, bulkOrderFoodData)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: ADD_BULK_ORDER_CATEGORY,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_BULK_ORDER_CATEGORY,
        payload: error,
      });
    });
};
};

export const addCategoryAction = (bulkOrderFoodData) => {
  return (dispatch) => {
      return ApiPostData(`/admin/category`, bulkOrderFoodData)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: ADD_CATEGORY,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_CATEGORY,
        payload: error,
      });
    });
};
};

export const addServingCategoryAction = (servingCategoryData) => {
  return (dispatch) => {
      return ApiPostData(`/admin/servingCategory`, servingCategoryData)
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
export const UpdatePrePackageCategoryNameAction = (id,data) => {
  console.log("id,data",id,data)
  return (dispatch) => {
      return ApiPut(`/admin/prePackageFood/${id}`, data)
    .then((res) => {
      if (res.status === "success") {
        return res.data;
      }
    })
    .catch((error) => {
     console.log(error)
    });
};
};

export const UpdateBulkOrderCategoryNameAction = (id,data) => {
  console.log("id,data",id,data)
  return (dispatch) => {
      return ApiPut(`/admin/bulkOrderCategory/${id}`, data)
    .then((res) => {
      if (res.status === "success") {
        return res.data;
      }
    })
    .catch((error) => {
     console.log(error)
    });
};
};

export const UpdateCategoryAction = (id,data) => {
  console.log("id,data",id,data)
  return (dispatch) => {
      return ApiPut(`/admin/category/${id}`, data)
    .then((res) => {
      if (res.status === "success") {
        return res.data;
      }
    })
    .catch((error) => {
     console.log(error)
    });
};
};

export const UpdateServingCategoryAction = (id,data) => {
  console.log("id,data",id,data)
  return (dispatch) => {
      return ApiPut(`/admin/servingCategory/${id}`, data)
    .then((res) => {
      if (res.status === "success") {
        return res.data;
      }
    })
    .catch((error) => {
     console.log(error)
    });
};
};
export const DeleteSelfServingCategoryAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/food/${id}`)
    .then((res) => {
      console.log("sdsgdgg",res)
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
     console.log(error)
    });
};
};

export const DeleteBulkOrderCategoryAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/bulkOrderCategory/${id}`)
    .then((res) => {
      console.log("sdsgdgg",res)
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
     console.log(error)
    });
};
};

export const DeleteCategoryAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/category/${id}`)
    .then((res) => {
      console.log("sdsgdgg",res)
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
     console.log(error)
    });
};
};



export const DeletePrePackageCategoryAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/prePackageFood/${id}`)
    .then((res) => {
      console.log("sdsgdgg",res)
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
     console.log(error)
    });
};
};

export const DeleteServingCategoryAction = (id) => {
  return (dispatch) => {
      return ApiDelete(`/admin/servingCategory/${id}`)
    .then((res) => {
      console.log("sdsgdgg",res)
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
     console.log(error)
    });
};
};

export const UpdateSelfServicesCategoryNameAction = (id,data) => {
  console.log("id,data",id,data)
  return (dispatch) => {
      return ApiPut(`/admin/food/${id}`, data)
    .then((res) => {
      if (res.status === "success") {
        return res.data;
      }
    })
    .catch((error) => {
     console.log(error)
    });
};
};

export const getFoodItemByCategoryIdAction = (foodId) => {
    return (dispatch) => {
        return ApiGet(`/admin/food-item/${foodId}`)
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
      return ApiGet(`/admin/pre_package_food_item/${foodId}`)
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


export const getBulkOrderItemByCategoryIdAction = (foodId) => {
  return (dispatch) => {
      return ApiGet(`/bulk-order/food-item/${foodId}`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_BULK_ORDER_ITEM,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_BULK_ORDER_ITEM,
        payload: error,
      });
    });
};
};

export const getItemByCategoryIdAction = (foodId) => {
  return (dispatch) => {
      return ApiGet(`/menu/food-item/${foodId}`)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: GET_ITEM,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_ITEM,
        payload: error,
      });
    });
};
};




export const getServingMethodByCategoryIdAction = (categoryId) => {
  return (dispatch) => {
      return ApiGet(`/admin/serving-method/${categoryId}`)
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

export const deleteServingMethodByIdAction = (categoryId) => {
  return () => {
      return ApiDelete(`/admin/food-item/${categoryId}`)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log("Error",error)
    });
};
};
export const deleteServingSingleMethodByIdAction = (categoryId) => {
  return () => {
      return ApiDelete(`/admin/serving-methods/${categoryId}`)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log("Error",error)
    });
};
};

export const deletePrePackageMethodByIdAction = (categoryId) => {
  return () => {
      return ApiDelete(`/admin/pre_package_food_item/${categoryId}`)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log("Error",error)
    });
};
};


export const deleteBulkOrderMethodByIdAction = (categoryId) => {
  return () => {
      return ApiDelete(`/admin/bulkOrderItem/${categoryId}`)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log("Error",error)
    });
};
};

export const deleteItemByIdAction = (categoryId) => {
  return () => {
      return ApiDelete(`/admin/item/${categoryId}`)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log("Error",error)
    });
};
};

export const addFoodItemAction = (formData) => {
  return (dispatch) => {
      return ApiPostData(`/admin/food-item`, formData)
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
export const EditSelfFoodItemAction = (id,formData) => {
  return () => {
      return ApiPostData(`/admin/food-item/${id}`, formData)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log(error)
    });
};
};
export const EditServingMethodItemAction = (id,formData) => {
  return () => {
      return ApiPut(`/admin/serving-methods/${id}`, formData)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log(error)
    });
};
};
export const EditPrePackageFoodItemAction = (id,formData) => {
  return () => {
      return ApiPostData(`/admin/pre_package_food_item/${id}`, formData)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log(error)
    });
};
};

export const EditBulkOrderItemAction = (id,formData) => {
  return () => {
      return ApiPut(`/admin/bulkOrderItem/${id}`, formData)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log(error)
    });
};
};


export const EditMenuItemAction = (id,formData) => {
  return () => {
      return ApiPut(`/admin/item/${id}`, formData)
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => {
      console.log(error)
    });
};
};


export const addPrePackageFoodItemAction = (formData) => {
  return (dispatch) => {
      return ApiPostData(`/admin/pre_package_food_item`, formData)
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

export const addBulkOrderFoodItemAction = (formData) => {
  return (dispatch) => {
      return ApiPostData(`/admin/pre_package_food_item`, formData)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: ADD_BULK_ORDER_ITEM,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_BULK_ORDER_ITEM,
        payload: error,
      });
    });
};
};


export const addServingMethodAction = (formData) => {
  return (dispatch) => {
      return ApiPostData(`/admin/serving-method`, formData)
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


export const addMenuItemAction = (formData) => {
  return (dispatch) => {
      return ApiPostData(`/admin/item`, formData)
    .then((res) => {
      if (res.status === "success") {
        dispatch({
          type: ADD_ITEM,
          payload: res.data,
        });
        return res.data;
      }
    })
    .catch((error) => {
      dispatch({
        type: ADD_ITEM,
        payload: error,
      });
    });
};
};