import { createSlice } from "@reduxjs/toolkit";

const calculateCosts = (state) => {
  state.shippingCost = 0;
  state.subTotal = 0;
  state.items.map((i) => {
    state.subTotal += i.quantity * i.price; //item.price;
    state.shippingCost += i.quantity * 5;
    return 0;
  });
  state.total = state.shippingCost + state.subTotal;
};

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const totalItems = cartItemsFromLocalStorage.reduce(
  (total, item) => total + item.quantity,
  0
);

const initialState = {
  items: cartItemsFromLocalStorage,
  shippingCost: 5 * totalItems,
  subTotal: cartItemsFromLocalStorage.reduce((subtotal, item) => {
    return subtotal + item.price * item.quantity;
  }, 0),
  total:
    cartItemsFromLocalStorage.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0) +
    5 * totalItems,
  shippingDetails: localStorage.getItem("shippingDetails")
    ? JSON.parse(localStorage.getItem("shippingDetails"))
    : "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_to_cart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.product === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        console.log("itema: ", action.payload);
        state.items.push({
          name: action.payload.name,
          price: action.payload.price,
          quantity: 1,
          image: action.payload.images[0].url,
          product: action.payload._id,
          category: action.payload.category,
          stock: action.payload.Stock,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      calculateCosts(state);
    },

    increment: (state, action) => {
      const item = state.items.find(
        (i) => i.product === action.payload.product
      );
      item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      calculateCosts(state);
    },
    decrement: (state, action) => {
      const item = state.items.find(
        (i) => i.product === action.payload.product
      );

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (i) => i.product !== action.payload.product
        );
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      calculateCosts(state);
    },

    remove_from_cart: (state, action) => {
      state.items = state.items.filter(
        (i) => i.product !== action.payload.product
      );

      localStorage.setItem("cartItems", JSON.stringify(state.items));
      calculateCosts(state);
    },
    emptyCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    addShippingDetails: (state, action) => {
      state.shippingDetails = action.payload;
      localStorage.setItem(
        "shippingDetails",
        JSON.stringify(state.shippingDetails)
      );
    },
  },
});

export const {
  add_to_cart,
  increment,
  remove_from_cart,
  decrement,
  addShippingDetails,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
