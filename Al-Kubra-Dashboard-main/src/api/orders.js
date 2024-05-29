import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiInstance } from "./apiInstance";


const getOrders = ()=> {
    return apiInstance().get("/admin/orders");
}

const getSingleOrder = (id)=> {
    return axios.get(`http://localhost:5000/api/v1/order/${id}`);
}





export const useGetOrders = ()=> {
    return useQuery("getOrders", getOrders)
}

export const useGetSingleOrder = (orderId)=> {
    return useQuery(["getOrders", orderId], ()=> getSingleOrder(orderId))
}



const  updateOrder=(orderId)=> {
    // console.log("from api", orderData.orderId);
    return apiInstance().put(`/admin/order/${orderId}`, {status: "Delivered"})
}
 

export const useUpdateOrder = ()=> {
    const queryClient = useQueryClient()
    return useMutation(updateOrder,{
        onSuccess: ()=>{
            queryClient.invalidateQueries("getOrders")
        }
    })
}
