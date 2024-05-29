import { Form, Formik } from "formik";
import React from "react";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../../api/user";
import Button from "../../components/Button/Button";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate } = useMutation(userLogin, {
    onSuccess: ({ success, user, token, message }) => {
      setTimeout(() => {
        toast("Log In Successful", {
          type: "success",
        });
      }, 500);
      dispatch(setUser({ user, token }));
      navigate("/");
    },
    onError: (error) => {
      setTimeout(() => {
        toast(error.response.data.message, {
          type: "error",
        });
      }, 500);
     
    },
  });

  return (
    <React.Fragment>
      <div className="conatiner flex justify-center my-6">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          // validationSchema={validate}
          onSubmit={async (values) => {
            const userData = {
              email: values.email,
              password: values.password,
            };
            mutate({ data: userData });
          }}
        >
          {({ errors, touched }) => (
            <div className="flex flex-col  px-6 pb-4 rounded-md shadow-md">
              <h1 className="heading">Log In</h1>
              <Form>
                <TextField type="email" name="email" placeholder="Email" />
                <TextField
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <Link
                  className="text-primary text-sm mb-2"
                  to={"/forgot-password"}
                >
                  Forgot Password?
                </Link>
                <Button text={"Log In"} width={"full"} type="submit" />

                <p className="mt-2 text-gray-600">
                  Don't have an Account?{" "}
                  <Link className="link" to={"/signup"}>
                    Signup
                  </Link>
                </p>
              </Form>
              <ToastContainer />
            </div>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default Login;
