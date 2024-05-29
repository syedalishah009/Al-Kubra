import axios from "axios";
import { QueryCache, useMutation, useQuery, useQueryClient } from "react-query";
import { apiInstance } from "./apiInstance";


// const getUsers = ()=>{
//     return apiInstance().get("/admin/users")
// }

export const GetSingleUser = (id)=>{
    return apiInstance().get(`/admin/user/${id}`)
}

const DeleteUser = (id)=>{
    return apiInstance().delete(`/admin/user/${id}`)
}


export const useGetSingleUser = (userId)=> { 
    return useQuery(["getSingleUser", userId], ()=> GetSingleUser(userId))
}

export const useGetUsers = (query)=> {
    console.log("qqoooq", query);
    return useQuery(["getUsers", query], ()=>{
        if (query) {
            console.log("insid q", query);
            // If there is a query, make the request with it
            return apiInstance().get(`/admin/users?q=${query}`);
          } else {
            return apiInstance().get("/admin/users");

          }
    })
}

export const updateUser = (user) =>{
    return apiInstance().put(`/me/update`, user)
}

// update user
export const useUpdateUser = ()=> {
    // console.log("in user", user);
    const queryClient = useQueryClient();
    return useMutation(updateUser,{
        onSuccess: ()=>{
            queryClient.invalidateQueries("getSingleUser")
        }
    })
}

export const useDeleteUser = ()=> {
    const queryClient = useQueryClient()
    return useMutation(DeleteUser,{
        onSuccess: ()=>{
            queryClient.invalidateQueries("getUsers")
        }
    })
}
