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

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  limit: 3,
  skip: 3,
  data: [],
  totalPages: 1,
  page: 1,
  q: "",
  category: "",
  tags: [],
  pagination:{},
  status: statusList.idle,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_PRODUCT:
      return { ...state, status: statusList.process };

    case ERROR_FETCHING_PRODUCT:
      return { ...state, status: statusList.error };

    case SUCCESS_FETCHING_PRODUCT:
      return {
        ...state,
        status: statusList.success,
        data: action.payload.data,
        totalPages: action.payload.pagination.totalPages,
        totalData: action.payload.pagination.totalData,
        page: action.payload.pagination.page,
        pagination:action.payload.pagination
      };

    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case SET_QUERY:
      return {
        ...state,
        q: action.payload,
      };

    case TOGGLE_TAGS:
      return {
        ...state,
        tags: action.payload,
      };

    case NEXT_PAGE:
      return {
        ...state,
        skip: action.payload,
      };

    case PREV_PAGE:
      return {
        ...state,
        skip: action.payload,
      };

    default:
      return state;
  }
}
