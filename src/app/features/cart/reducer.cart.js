import {
  ADD_ITEM,
  CLEAR_ITEM,
  REMOVE_ITEM,
  REMOVE_ONE,
} from "./constants.cart";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

export default function cartReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_ITEM:
      if (state.find((item) => item._id === payload.item._id)) {
        return state.map((item) => ({
          ...item,
          qty: item._id === payload.item._id ? item.qty + 1 : item.qty,
        }));
      } else {
        return [
          ...state,
          { ...payload.item, qty: 1, price: payload.item.price },
        ];
      }

    case REMOVE_ONE:
      return state.filter((item) => item._id !== payload.id);

    case REMOVE_ITEM:
      return state.map((item) => ({
        ...item,
        qty: item._id === payload.item._id ? item.qty - 1 : item.qty,
      }));

    case CLEAR_ITEM:
      localStorage.removeItem("cart");
      return [];

    default:
      return state;
  }
}
