import { apiInstance } from "./apiInstance";

// create message
export const contactMessage = async ({ message, token }) => {
    return apiInstance(token)
      .post("/contact-us", {...message} )
      .then((res) =>  res.data);
  };