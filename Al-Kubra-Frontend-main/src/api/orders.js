import axios from "axios";
import { apiInstance } from "./apiInstance";

// create order
export const createOrder = async ({ order, token }) => {
  await apiInstance(token)
    .post("/order/new", order)
    .then((res) => console.log("order: ", res.data));
};

// get my orders
export const getMyOrders = async (token) => {
  return await apiInstance(token)
    .get("/orders/me")
    .then((res) => res.data);
};
