import { getProduct } from "../../apis/product.api";
import {
  ERROR_FETCHING_PRODUCT,
  NEXT_PAGE,
  PREV_PAGE,
  SET_CATEGORY,
  SET_QUERY,
  START_FETCHING_PRODUCT,
  SUCCESS_FETCHING_PRODUCT,
  TOGGLE_TAGS,
} from "./constants.product";

export const startFetchingProduct = () => ({
  type: START_FETCHING_PRODUCT,
});

export const errorFetchingProduct = () => ({
  type: ERROR_FETCHING_PRODUCT,
});

export const successFetchingProduct = (payload) => ({
  type: SUCCESS_FETCHING_PRODUCT,
  payload,
});

export const fetchProductByCategory = (category) => {
  return {
    type: SET_CATEGORY,
    payload: category,
  };
};

export const fetchProductByKeyword = (query) => {
  return {
    type: SET_QUERY,
    payload: query,
  };
};

export const fetchProductByTag = (tag) => {
  return {
    type: TOGGLE_TAGS,
    payload: tag,
  };
};

export const setNextPage = (next) => {
  return {
    type: NEXT_PAGE,
    payload: next,
  };
};

export const setPrevPage = (prev) => {
  return {
    type: PREV_PAGE,
    payload: prev,
  };
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingProduct());
    try {
      const limit = getState().products.limit || 3;
      const skip = getState().products.skip || 0;
      const category = getState().products.category || "";
      const tags = getState().products.tags || [];
      const q = getState().products.q || "";

      const params = {
        limit,
        skip,
        category,
        tags,
        q,
      };

      const { data } = await getProduct(params);
      dispatch(successFetchingProduct(data));
    } catch (error) {
      dispatch(errorFetchingProduct());
      console.log(error);
    }
  };
};
