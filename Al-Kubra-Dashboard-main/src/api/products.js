import axios from "axios";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { apiInstance } from "./apiInstance";
import { useNavigate } from "react-router-dom";

// here we will use another way of calling

// Get All Products
export const useGetProducts = ({ pageParam = 1, keyword, category }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let link = "http://localhost:5000/api/v1/products?keyword=";

  if (keyword && typeof keyword === "string") {
    link += `${keyword}`;
  }
  link += `&page=${pageParam}`;
  if (category) {
    link += `&category=${category}`;
  }

  const {
    data,
    hasNextPage,
    refetch,
    isRefetchError,
    isRefetching,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["getProducts", "infinite"],
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage + 1;
    },
    queryFn: async () => {
      return await axios.get(link, config).then((res) => res.data);
    },
  });
  console.log("ddatta: ", data);
  return {
    data,
    error,
    refetch,
    hasNextPage,
    isRefetchError,
    isRefetching,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    status,
  };
};

// Get single product
export const useGetSingleProduct = (productId) => {
  return useQuery(["getProducts", productId], () => {
    return axios.get(`http://localhost:5000/api/v1/product/${productId}`);
  });
};

// Delete Product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => {
    // console.log("id", id);
    return apiInstance().delete(`/admin/product/${id}`, {
      onSuccess: () => {
        queryClient.invalidateQueries("getProducts");
      },
    });
  });
};

// Add Product
export const useAdddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((productData) => {
    console.log(productData);
    return apiInstance().post(
      "http://localhost:5000/api/v1/admin/products/new",
      productData,
      {
        onSuccess: () => {
          queryClient.invalidateQueries("getProducts");
        },
      }
    );
  });
};

// Update Product
export const useUpdatedProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((product) => {
    // console.log("ppppp", product._id);
    return apiInstance().put(
      `http://localhost:5000/api/v1/admin/product/${product._id}`,
      product,
      {
        onSuccess: () => {
          queryClient.invalidateQueries("getProducts");
        },
      }
    );
  });
};
