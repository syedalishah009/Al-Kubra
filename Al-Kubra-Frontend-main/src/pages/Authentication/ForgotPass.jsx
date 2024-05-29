import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPass } from "../../api/user";
import Button from "../../components/Button/Button";

const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const { mutate } = useMutation(forgotPass, {
    onSuccess: ({ message }) => {
      setTimeout(() => {
        toast(message, {
          type: "success",
        });
      }, 10);
    },
    onError: (error) => {
      setTimeout(() => {
        toast(error.response.data.message, {
          type: "error",
        });
      }, 10);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(email);
  };

  return (
    <React.Fragment>
      <div className="container">
        <ToastContainer />
        <form
          className="w-full lg:w-1/2 mx-auto flex flex-col my-8 justify-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <p className="text-gray-500 text-center">
            Please enter your registered email, we'll send you an email.
          </p>
          <input
            className="w-full my-2 border-2 border-black p-2 rounded-md"
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button text={"Send Email"} width={"full"} type="submit" />
        </form>
      </div>
    </React.Fragment>
  );
};

export default ForgotPass;
