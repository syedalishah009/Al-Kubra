import axios from "axios"
import { useQuery } from "react-query"
import { apiInstance } from "./apiInstance"



export const useGetTraine = ()=>{
    return useQuery("getTraine", ()=>{
        return apiInstance().get("/admin/forms")
    })
}

export const useGetSingleTraine = (id)=>{
    return useQuery(["getTraine", id], ()=>{
        return apiInstance().get(`/admin/forms/${id}`)
    })
}