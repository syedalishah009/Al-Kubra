import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: localStorage.getItem("currentUser")?
    JSON.parse(localStorage.getItem("currentUser")):null,

    // allUsers: localStorage.getItem("allUsers")?
    // JSON.parse(localStorage.getItem("allUsers")):[],

    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      // console.log("action", action.payload);
      state.isFetching = false;
      state.currentUser = action.payload;
      localStorage.setItem("currentUser",JSON.stringify(state.currentUser));
      localStorage.setItem("token", action.payload.token)
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.clear();
    },

    // // GET USERS
    // getUsersStart: (state) => {
    //   state.isFetching = true;
    // },
    // getUsersSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.allUsers = action.payload;
    //   localStorage.setItem("allUsers",JSON.stringify(state.allUsers));

    // },
    // getUsersFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
    // // DELETE USERS
    // deleteUsersStart: (state) => {
    //   state.isFetching = true;
    // },
    // deleteUsersSuccess: (state, action) => {
    //   state.isFetching = false;

    //   state.allUsers = state.allUsers.filter((user)=>
    //   user._id !== action.payload
    // );
    // localStorage.setItem("allUsers",JSON.stringify(state.allUsers));

    // },
    // deleteUsersFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },

    // UPDATE USERS
    // updateUsersStart: (state) => {
    //   state.isFetching = true;
    // },
    // updateUsersSuccess: (state, action) => {
    //   state.isFetching = false;
    //   state.products[ // find user and update
    //     state.products.findIndex((item) => item._id === action.payload.id)
    //   ] = action.payload.product;
    // },
    // updateUsersFailure: (state) => {
    //   state.isFetching = false;
    //   state.error = true;
    // },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, getUsersStart,getUsersSuccess, getUsersFailure,deleteUsersStart,deleteUsersSuccess,deleteUsersFailure,updateUsersStart,updateUsersSuccess,updateUsersFailure} = userSlice.actions;
export default userSlice.reducer;