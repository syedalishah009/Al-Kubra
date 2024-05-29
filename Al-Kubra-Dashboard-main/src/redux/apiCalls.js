import axios from "axios";

import { createProductFailure, createProductStart, createProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess } from "./productRedux";
import { deleteUsersFailure, deleteUsersStart, deleteUsersSuccess, getUsersFailure, getUsersStart, getUsersSuccess, loginFailure, loginStart, loginSuccess } from "./userRedux";
import { getOrderFailure, getOrderStart, getOrderSuccess, updateOrderStart, updateOrderSuccess, updateOrdertFailure } from "./orderReducer";
// import { apiInstance } from "./apiIntance";
// import { apiInstance } from "./apiIntance";

// const token = JSON.parse(localStorage.getItem("token"))

// export const apiInstance = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
//   withCredentials: true, // Allow cookies to be sent with requests
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
// });



// LOGIN
export const login = async (dispatch, userData) => {
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:5000/api/v1/login", userData);
      console.log(res.data);
      dispatch(loginSuccess(res.data));
    } catch (err) {
      dispatch(loginFailure());
    }
  }; 



// Get All products
export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
      const res = await axios.get("http://localhost:5000/api/v1/products");
      dispatch(getProductSuccess(res.data.products));
    } catch (err) {
      dispatch(getProductFailure());
    }
  }; 


  
  // delete PRODUCT
  export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/admin/product/${id}`);
      dispatch(deleteProductSuccess(id));
    } catch (err) {
      console.log("err",err);
      dispatch(deleteProductFailure());

    }
  };

  
  // CREATE PRODUCT
  export const createProduct = async (product,dispatch) => {
    dispatch(createProductStart());
    try {
      const res = await axios.post("http://localhost:5000/api/v1/admin/products/new", product);
      dispatch(createProductSuccess(res.data));
    } catch (err) {
      dispatch(createProductFailure());
    }
  };
  

  //GET USERS
  export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
      const res = await axios.get("http://localhost:5000/api/v1/admin/users");
      dispatch(getUsersSuccess(res.data.users));
    } catch (err) {
      console.log("err", err);
      dispatch(getUsersFailure());
    }
  };



  // DELETE USER
  export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUsersStart());
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/admin/user/${id}`);
      dispatch(deleteUsersSuccess(id));
    } catch (err) {
      dispatch(deleteUsersFailure());
    }
  };


  // Get All orders
export const getAllOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await axios.get("http://localhost:5000/api/v1/admin/orders");
    dispatch(getOrderSuccess(res.data.orders));
    console.log(res.data);
  } catch (err) {
    dispatch(getOrderFailure());
  }
}; 
  // Update Order
export const upateOrder = async (dispatch,orderId) => {
  dispatch(updateOrderStart());
  try {
    const res = await axios.put(`http://localhost:5000/api/v1/admin/order/${orderId}`,{status: "Delivered"});
    dispatch(updateOrderSuccess(orderId));
    // console.log(res.data);
  } catch (err) {
    dispatch(updateOrdertFailure());
  }
}; 