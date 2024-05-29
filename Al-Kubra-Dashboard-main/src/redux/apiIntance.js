import axios from "axios";

const token = localStorage.getItem("token")
// console.log("token", token);


// const GetAuthToken = () => {
//     const token = useSelector((state) => state.users.currentUser.token);
//     return token;
//   };


//   export const apiInstance = axios.create({
//     baseURL: "http://localhost:5000/api/v1",
//     withCredentials: true,
//   });

//   apiInstance.interceptors.request.use((config) => {
//     const token = GetAuthToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   });

// instance for authuntication
export const apiInstance = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true, // Allow cookies to be sent with requests
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });



// export const configureApiInstance = (token) => {
//     return axios.create({
//       baseURL: "http://localhost:5000/api/v1",
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   };