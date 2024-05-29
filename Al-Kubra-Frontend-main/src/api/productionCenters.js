import axios from "axios";
import { apiInstance } from "./apiInstance";

// const base = "https://alkubra.mooo.com";
// const base = "http://localhost:5000";

// get production centers
export const getCenters = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios
    .get(`/api/v1/production-centers`, config)
    .then((res) => res.data);
};

//get single center
export const getSingleCenter = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios
    .get(`/api/v1/production-centers/${id}`, config)
    .then((res) => res.data);
};

//submit application form
export const submitForm = async ({ values, token }) => {
  return apiInstance(token)
    .post("/submit-form", { ...values })
    .then((res) => res.data);
};
