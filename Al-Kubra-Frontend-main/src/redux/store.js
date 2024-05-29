import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart/cartSlice";
import userSlice from "./user/userSlice";
import wishListSlice from "./wishList/wishListSlice";
import interactionSlice from "./interaction/interactionSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    wishList: wishListSlice,
    interaction: interactionSlice,
  },
});
