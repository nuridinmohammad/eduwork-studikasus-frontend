import {
  ADD_ITEM,
  CLEAR_ITEM,
  REMOVE_ITEM,
  REMOVE_ONE,
} from "./constants.cart";

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: {
      item: {
        ...item,
        product: item.product || item,
      },
    },
  };
};

export const removeItem = (item) => ({
  type: REMOVE_ITEM,
  payload: {
    item: item,
  },
});

export const removeOne = (id) => {
  return {
    type: REMOVE_ONE,
    payload: {
      id: id,
    },
  };
};

export const clearItem = () => ({
  type: CLEAR_ITEM,
});
