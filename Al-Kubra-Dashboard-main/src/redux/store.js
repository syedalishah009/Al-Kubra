import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import productReducer from "./productRedux";
import orderReducer from "./orderReducer";

export const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    orders: orderReducer,
  }
  
});
