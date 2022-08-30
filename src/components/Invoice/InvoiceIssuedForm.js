import React from "react";
import FormInput from "../FormInput";
import "../../formInput.css";


const InvoiceIssuedForm = ({ invoice, setInvoice }) => {

  const inputs = [
    {
      id: 1,
      name: "IssueDate",
      type: "date",
      placeholder: "issued at",
      errorMessage:
        "Enter valid Date",
      label: "Issued At",
      required: true,
    },
    {
      id: 2,
      name: "DueDate",
      type: "date",
      placeholder: "due date",
      errorMessage:
        "Enter valid Date",
      label: "Due Date",
      required: true,
    },
    {
      id: 3,
      name: "InvoiceNumber",
      type: "text",
      placeholder: "INV - xxxxxx",
      errorMessage: "Enter invoice number",
      label: "Invoice Number",
      required: true,
    },
    {
      id: 4,
      name: "refNumber",
      type: "text",
      placeholder: " ",
      label: "Ref Number",
    },
  ];

  const onChange = (event) => {
    setInvoice({ ...invoice, [event.target.name]: event.target.value.toString() });
    // console.log(event.target.value);
  };


  return (
    <div >
      <form className="InvoiceIssuedForm">

        {inputs.map((input) => (
          <FormInput
            invoiceFormInput={"invoiceFormInput"}
            key={input.id}
            {...input}
            // value={values[input.name]}
            onChange={onChange}
          />
        ))}
      </form>
    </div>
  );

}

export default InvoiceIssuedForm;