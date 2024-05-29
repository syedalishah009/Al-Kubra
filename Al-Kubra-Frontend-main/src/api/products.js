import axios from "axios";
import { apiInstance } from "./apiInstance";

// const base = "https://alkubra.mooo.com";
// const base = "http://localhost:5000";

export async function getProducts({
  keyword = "",
  price = [0, 30000],
  category,
  ratings = 5,
  pageParam = 1,
}) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let link = `/api/v1/products?keyword=`;

  if (keyword && typeof keyword === "string") {
    link += `${keyword}`;
  }
  link += `&page=${pageParam}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[lte]=${ratings}`;
  if (category) {
    link += `&category=${category}`;
  }

  return await axios.get(link, config).then((res) => res.data);
}

export async function getNewArrivals() {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios
    .get(`/api/v1/new-arrivals`, config)
    .then((res) => res.data);
}

export async function getPopularProducts() {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios
    .get(`/api/v1/products?ratings[gte]=4`, config)
    .then((res) => res.data);
}

export async function getProduct(id) {
  return await axios.get(`/api/v1/product/${id}`).then((res) => res.data);
}

//feedback
export const feedback = async ({ feedbackData, token }) => {
  return apiInstance(token)
    .put("/review", feedbackData)
    .then((res) => res.data);
};

//Recommendation
export async function recommend({ products }) {
  return await axios.post(`/api/v1/recommend`, {
    products,
  });
  // return await axios.get("http://13.234.225.171:5000/api/v1/products");
}
