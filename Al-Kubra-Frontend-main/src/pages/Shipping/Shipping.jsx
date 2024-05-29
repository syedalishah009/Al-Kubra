import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addShippingDetails } from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

export const validate = Yup.object().shape({
  name: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  pinCode: Yup.string().required("Required"),
  phoneNo: Yup.string().required("Required"),
});

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingDetails = useSelector((state) => state.cart.shippingDetails);

  return (
    <React.Fragment>
      <div className="conatiner flex justify-center my-6">
        <Formik
          initialValues={{
            name: shippingDetails ? shippingDetails.name : "",
            country: shippingDetails ? shippingDetails.country : "",
            state: shippingDetails ? shippingDetails.state : "",
            city: shippingDetails ? shippingDetails.city : "",
            address: shippingDetails ? shippingDetails.address : "",
            pinCode: shippingDetails ? shippingDetails.pinCode : "",
            phoneNo: shippingDetails ? shippingDetails.phoneNo : "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            dispatch(addShippingDetails(values));
            navigate("/order/confirm");
          }}
        >
          {({ setFieldValue }) => (
            <div className="w-[80%] flex flex-col px-6 pb-4 rounded-md shadow-md">
              <h1 className="heading">Shipping Details</h1>
              <Form className="flex flex-wrap justify-between">
                <div className="mb-4 w-full lg:w-[48%]">
                  <Field
                    type="text"
                    placeholder="Your name"
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
                  <Field
                    as="select"
                    placeholder="Your name"
                    id="country"
                    name="country"
                    className="h-[38px] w-[100%] border-2 border-gray-300 outline-none px-2 rounded-md"
                  >
                    <option value="" label="Select a country" />
                    <option value="pakistan" label="Pakistan" />
                  </Field>
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="country"
                  />
                </div>
                <div className="mb-4 w-full lg:w-[48%]">
                  <Field
                    as="select"
                    id="state"
                    name="state"
                    className="h-[38px] w-[100%] border-2 border-gray-300 outline-none px-2 rounded-md"
                  >
                    <option value="" label="Select a Province" />
                    <option value="Punjab" label="Punjab" />
                    <option value="KPK" label="KPK" />
                    <option value="Sindh" label="Sindh" />
                    <option value="Balochistan" label="Balochistan" />
                    <option value="Azad Kashmir" label="Azad Kashmir" />
                    <option value="Gilgit Baltistan" label="Gilgit Baltistan" />
                  </Field>
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="state"
                  />
                </div>
                <div className="mb-4 w-full lg:w-[48%]">
                  <Field
                    as="select"
                    id="city"
                    name="city"
                    className="h-[38px] w-[100%] border-2 border-gray-300 outline-none px-2 rounded-md"
                  >
                    <option value="" label="Select a City" />
                    <option value="Karachi" label="Karachi" />
                    <option value="Lahore" label="Lahore" />
                    <option value="Islamabad" label="Islamabad" />
                  </Field>
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="sity"
                  />
                </div>

                <div className="mb-4 w-full lg:w-[48%]">
                  <Field
                    type="text"
                    placeholder="Your Address"
                    id="address"
                    name="address"
                    className="h-[20px] w-[100%] border-2 border-gray-300 outline-none py-4 px-2 rounded-md"
                  />
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="address"
                  />
                </div>
                <div className="mb-4 w-full lg:w-[48%]">
                  <Field
                    type="number"
                    placeholder="Pin Code"
                    id="pinCode"
                    name="pinCode"
                    className="h-[20px] w-[100%] border-2 border-gray-300 outline-none py-4 px-2 rounded-md"
                  />
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="pinCode"
                  />
                </div>
                <div className="mb-4 w-full lg:w-[48%]">
                  <Field
                    type="number"
                    placeholder="Phone Number"
                    id="phoneNo"
                    name="phoneNo"
                    className="h-[20px] w-[100%] border-2 border-gray-300 outline-none py-4 px-2 rounded-md"
                  />
                  <ErrorMessage
                    className="text-sm text-red-600"
                    component="p"
                    name="phoneNo"
                  />
                </div>
                <Button text={"Continue"} width={"full"} type="submit" />
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
};

export default Shipping;
