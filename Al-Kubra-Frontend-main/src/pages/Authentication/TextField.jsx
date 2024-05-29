import React from "react";
import { ErrorMessage, useField } from "formik";

const TextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  console.log(placeholder, props);
  return (
    <div className="mb-4">
      <input
        className={`${
          meta.touched && meta.error ? "is-invalid" : ""
        } h-[20px] w-[300px] border-2 border-gray-600 py-4 px-2 rounded-md`}
        {...field}
        {...props}
        placeholder={placeholder}
      />
      <ErrorMessage
        component="p"
        name={field.name}
        className="text-sm text-red-600"
      />
    </div>
  );
};

export default TextField;
