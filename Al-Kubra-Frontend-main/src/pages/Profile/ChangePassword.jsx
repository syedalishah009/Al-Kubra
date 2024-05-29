import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { changePass } from "../../api/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useSelector((state) => state.user);

  const { mutate } = useMutation(changePass, {
    onSuccess: () => {
      setTimeout(() => {
        toast("Password Changed Successfully", { type: "success" });
      }, 10);
      setNewPassword("");
      setOldPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (error) => {
      setTimeout(() => {
        toast(error.response.data.message, { type: "error" });
      }, 10);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { oldPassword, newPassword, confirmPassword };
    mutate({ data, token });
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="heading">Change Password</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="p-2 border rounded-md w-full"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2 border rounded-md w-full"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-2 border rounded-md w-full"
          required
        />
        <button
          type="submit"
          className="border-2 border-[#e94560] bg-[#e94560] py-2 text-white rounded-md w-full hover:text-[#e94560] hover:bg-white"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
