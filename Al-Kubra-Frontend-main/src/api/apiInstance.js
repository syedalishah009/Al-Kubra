import axios from "axios";

// const base = "https://alkubra.mooo.com";

// const base = "http://localhost:5000";

export const apiInstance = (token) => {
  return axios.create({
    // baseURL: `${base}/api/v1`,
    baseURL: "/api/v1",
    withCredentials: true, // Allow cookies to be sent with requests
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
