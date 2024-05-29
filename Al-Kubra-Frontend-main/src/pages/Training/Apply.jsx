import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitForm } from "../../api/productionCenters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

export const validate = Yup.object().shape({
  name: Yup.string()
    .max(14, "First name should not be more than 14 characters")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  cnic: Yup.string()
    .required("Required")
    .matches(
      /^\d{5}-\d{7}-\d$/,
      "Invalid CNIC format. Correct format: 00000-0000000-0"
    ),
  phone: Yup.string()
    .required("Required")
    .matches(
      /^\+92\d{10}$/,
      "Invalid phone number. Correct format: +923000000000"
    ),
  district: Yup.string().required("Required"),
  image: Yup.string(),
  // required("Image is required"),
  productionCenter: Yup.string().required("Required"),
});

const Apply = () => {
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading ] = useState(false);


  const { mutate } = useMutation(submitForm, {
    onSuccess: () => {
      setTimeout(() => {
        setLoading(false)
        toast("Application Submitted Successfuly", {
          type: "success",
        });
      }, 3000);
    },
  });

  return (
    <React.Fragment>
      <ToastContainer />
      <div className="conatiner flex justify-center my-6">
        <Formik
          initialValues={{
            name: "",
            email: "",
            cnic: "",
            phone: "",
            district: "",
            image: "",
            productionCenter: "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            setLoading(true);
            mutate({ values, token });
          }}
        >
          {({ setFieldValue }) => (
            <div className="w-[80%] relative flex flex-col px-6 pb-4 rounded-md shadow-md">
              <h1 className="heading">Application Form</h1>
              <Form className="flex flex-wrap justify-between">
                <div className="mb-4 w-full lg:w-[48%]">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="h-[20px] w-[100%] border-2 border-gray-300 outline-none py-4 px-2 rounded-md"
                  />
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="name"
                  />
                </div>
                <div className="mb-4 w-full lg:w-[48%]">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="h-[20px] w-[100%] border-2 border-gray-300 outline-none py-4 px-2 rounded-md"
                  />
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="email"
                  />
                </div>
                <div className="mb-4 w-full lg:w-[48%]">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Phone
                  </label>
                  <Field
                    type="text"
                    id="phone"
                    name="phone"
                    className="h-[20px] w-[100%] border-2 border-gray-300 outline-none py-4 px-2 rounded-md"
                  />
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="phone"
                  />
                </div>
                <div className="mb-4 w-full lg:w-[48%]">
                  <label
                    htmlFor="cnic"
                    className="text-sm font-medium text-neutral-700"
                  >
                    CNIC
                  </label>
                  <Field
                    type="text"
                    id="cnic"
                    name="cnic"
                    className="h-[20px] w-[100%] border-2 border-gray-300 outline-none py-4 px-2 rounded-md"
                  />
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="cnic"
                  />
                </div>
                <div className="mb-4 w-full lg:w-[48%]">
                  <label
                    htmlFor="productionCenter"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Production Center
                  </label>
                  <Field
                    as="select"
                    id="productionCenter"
                    name="productionCenter"
                    className="h-[38px] w-[100%] border-2 border-gray-300 outline-none px-2 rounded-md"
                  >
                    <option value="" label="Select Production Center" />
                    <option value="mirpur" label="Mirpur" />
                    <option value="poonch" label="Poonch" />
                    <option value="bhimberl" label="Bhimber" />
                  </Field>
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="productionCenter"
                  />
                </div>
                <div className="mb-4 w-full lg:w-[48%]">
                  <label
                    htmlFor="district"
                    className="text-sm font-medium text-neutral-700"
                  >
                    District
                  </label>
                  <Field
                    as="select"
                    id="district"
                    name="district"
                    className="h-[38px] w-[100%] border-2 border-gray-300 outline-none px-2 rounded-md"
                  >
                    <option value="" label="Select your destrict" />
                    <option value="mirpur" label="Mirpur" />
                    <option value="poonch" label="Poonch" />
                    <option value="bhimber" label="Bhimber" />
                  </Field>
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="district"
                  />
                </div>
                <div className="mb-4 w-full lg:w-[48%] flex flex-col gap-2">
                  <label
                    htmlFor="image"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Profile Image
                  </label>
                  <input type="file" id="image" name="image" />
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="image"
                  />
                </div>
                <Button text={"Submit Form"} width={"full"} />
              </Form>
              {loading && <Loader />}
            </div>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default Apply;
