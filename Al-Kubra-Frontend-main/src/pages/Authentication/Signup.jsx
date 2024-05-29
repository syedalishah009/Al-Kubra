import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { userSignUp } from "../../api/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../redux/user/userSlice";
import Button from "../../components/Button/Button";

export const validate = Yup.object().shape({
  firstName: Yup.string()
    .max(14, "First name should not be more than 14 characters")
    .required("Required"),
  lastName: Yup.string().max(
    14,
    "Last name should not be more than 14 characters"
  ),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password should be atleast 8 characters")
    .max(18, "Password should not be more than 18 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate } = useMutation(userSignUp, {
    onSuccess: ({ user, token }) => {
      setTimeout(() => {
        toast("Sign Up Successful", {
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
      <ToastContainer />
      <div className="conatiner flex justify-center my-6">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            const data = {
              name: `${values.firstName} ${values.lastName}`,
              email: values.email,
              password: values.password,
            };
            mutate(data);
          }}
        >
          {({ errors, touched }) => (
            <div className="flex flex-col  px-6 pb-4 rounded-md shadow-md">
              <h1 className="heading">Sign Up</h1>
              <Form>
                <TextField
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                />
                <TextField
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                />
                <TextField type="email" name="email" placeholder="Email" />
                <TextField
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <TextField
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <Button text={"Sign Up"} width={"full"} type="submit" />
                <p className="mt-2 text-gray-600">
                  Already have an Account?{" "}
                  <Link className="link" to={"/login"}>
                    Login
                  </Link>
                </p>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default Signup;
