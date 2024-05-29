import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders:localStorage.getItem("orders")?
    JSON.parse(localStorage.getItem("orders")):[],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload
      localStorage.setItem("orders",JSON.stringify(state.orders));
    },
    getOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
//     //DELETE
//     deleteProductStart: (state) => {
//       state.isFetching = true;
//       state.error = false;
//     },
//     deleteProductSuccess: (state, action) => {
//       state.isFetching = false;
//       // console.log("state", typeof state.products );
//       state.products = state.products.filter((product)=>
//       product._id !== action.payload
//     );
//       localStorage.setItem("products",JSON.stringify(state.products));

//     },
//     deleteProductFailure: (state) => {
//       state.isFetching = false;
//       state.error = true;
//     },
    //UPDATE
    updateOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateOrderSuccess: (state, action) => {
      // console.log("payload", action.payload);
      state.isFetching = false;
      const updatedOrder = state.orders.map(order =>{
        if(order._id === action.payload){
          return {...order, orderStatus: "Delivered"}
        }
        return order
      })
      state.orders = updatedOrder;
      localStorage.setItem("orders",JSON.stringify(state.orders));
    },
    updateOrdertFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

//     //CREATE
//     createProductStart: (state) => {
//       state.isFetching = true;
//       state.error = false;
//     },
//     createProductSuccess: (state, action) => {
//       state.isFetching = false;
//       state.products.push(action.payload);
//       localStorage.setItem("products",JSON.stringify(state.products));

//     },
//     createProductFailure: (state) => {
//       state.isFetching = false;
//       state.error = true;
//     },
  },
});

export const {
    getOrderStart,
    getOrderSuccess,
    getOrderFailure,
    updateOrderStart,
    updateOrderSuccess,
    updateOrdertFailure
 
} = orderSlice.actions;

export default orderSlice.reducer;