import axios from "axios";
import { apiInstance } from "./apiInstance";

// const base = "https://alkubra.mooo.com";
// const base = "http://localhost:5000";

export async function userSignUp(data) {
  const res = await axios.post(`/api/v1/register`, data);
  console.log("user data: ", res.data);
  return res.data;
}

export async function userLogin({ data }) {
  const res = await axios.post(`/api/v1/login`, data);
  return res.data;
}

export async function forgotPass(email) {
  const res = await axios.post(`/api/v1/password/forgot`, {
    email,
  });
  return res.data;
}

export async function resetPass({ data, token }) {
  const res = await axios.put(`/api/v1/password/reset/${token}`, data);
  return res.data;
}

export async function changePass({ data, token }) {
  const res = await apiInstance(token).put(`/password/update`, data);
  return res.data;
}

export async function getMyDetails(token) {
  const res = await apiInstance(token).get(`/me`);
  return res.data;
}
