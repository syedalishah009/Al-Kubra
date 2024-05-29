import axios from "axios";

const token = localStorage.getItem("token");

export const apiInstance = () => {
  
  return axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
