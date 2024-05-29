import { ErrorMessage } from "formik";
import React from "react";
import Select from "react-select";

const SelectField = ({ placeholder, districtOptions, name, setFieldValue }) => {
  return (
    <div className="mb-4 w-[48%]">
      <Select
        options={districtOptions}
        id={name}
        name={name}
        onChange={(value) => setFieldValue("district", value)}
        isClearable
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default SelectField;
