import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : "",
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
    isAuthenticated: localStorage.getItem("isAuthenticated")
      ? localStorage.getItem("isAuthenticated")
      : false,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.user = localStorage.getItem("user");
      localStorage.setItem("token", action.payload.token);
      state.token = localStorage.getItem("token");
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", true);
      state.loading = false;
    },
    removeUser: (state) => {
      localStorage.setItem("user", "");
      state.user = localStorage.getItem("user");
      localStorage.setItem("token", "");
      state.token = localStorage.getItem("token");
      state.isAuthenticated = false;
      localStorage.setItem("isAuthenticated", false);
      state.loading = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
