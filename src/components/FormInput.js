import React, { useState } from "react";
import "../formInput.css";
import "../Invoice.css"

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { invoiceFormInput, label, errorMessage, onChange, id, ...inputProps } = props;
  // console.log(props)
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className={invoiceFormInput ? invoiceFormInput : "formInput"}>
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
