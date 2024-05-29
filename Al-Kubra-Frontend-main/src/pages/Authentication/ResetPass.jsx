import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPass } from "../../api/user";
import Button from "../../components/Button/Button";

const ResetPass = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const params = useParams();
  const token = params.token;

  const { mutate } = useMutation(resetPass, {
    onSuccess: ({ message }) => {
      toast(message, {
        type: "success",
      });
      setConfirmPassword("");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
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
    const data = {
      password,
      confirmPassword,
    };
    mutate({ data, token });
  };

  return (
    <React.Fragment>
      <div className="container">
        <ToastContainer />
        <form
          className="flex flex-col w-full lg:w-1/2 mx-auto my-8 justify-center"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <p className="text-gray-500 text-center">Reset Password</p>
          <input
            className="w-full  my-2 border-2 border-black p-2 rounded-md"
            name="password"
            placeholder="New Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="w-full my-2 border-2 border-black p-2 rounded-md"
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button text={"Reset Password"} width={"full"} type="submit" />
        </form>
      </div>
    </React.Fragment>
  );
};

export default ResetPass;
