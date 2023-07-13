import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import productsReducer from "./features/product/reducer.product";
import authReducer from "./features/auth/reducer.auth";
import cartReducer from "./features/cart/reducer.cart";

const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
  carts: cartReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
