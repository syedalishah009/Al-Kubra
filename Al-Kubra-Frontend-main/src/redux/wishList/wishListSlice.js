import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("wishList")
    ? JSON.parse(localStorage.getItem("wishList"))
    : [],
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const alreadyExist = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (alreadyExist) {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem("wishList", JSON.stringify(state.items));
    },
  },
});

export const { addToWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
