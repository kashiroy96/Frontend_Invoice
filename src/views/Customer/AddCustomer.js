import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/Context";
import { v4 as uuidv4 } from "uuid";
import FormInput from "../../components/FormInput";
import "../../formInput.css";
import axios from "axios";

export const inputs = [
  {
    id: 1,
    name: "name",
    type: "text",
    placeholder: "Name",
    errorMessage:
      "Name should be 3-16 characters and shouldn't include any special character!",
    label: "Name",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    id: 2,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "It should be a valid email address!",
    label: "Email",
    required: true,
  },
  {
    id: 3,
    name: "phone",
    type: "text",
    placeholder: "Phone",
    errorMessage: "It should be a valid phone number!",
    label: "Phone",
    pattern: "[789][0-9]{9}",
    required: true,
  },


];
const AddCustomerForm = () => {
  const { dispatch } = useContext(AppContext);

  const [values, setValues] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    created_on: "",
  });

  // const inputs = [
  //   {
  //     id: 1,
  //     name: "name",
  //     type: "text",
  //     placeholder: "Name",
  //     errorMessage:
  //       "Name should be 3-16 characters and shouldn't include any special character!",
  //     label: "Name",
  //     pattern: "^[A-Za-z0-9]{3,16}$",
  //     required: true,
  //   },
  //   {
  //     id: 2,
  //     name: "email",
  //     type: "email",
  //     placeholder: "Email",
  //     errorMessage: "It should be a valid email address!",
  //     label: "Email",
  //     required: true,
  //   },
  //   {
  //     id: 3,
  //     name: "phone",
  //     type: "text",
  //     placeholder: "Phone",
  //     errorMessage: "It should be a valid phone number!",
  //     label: "Phone",
  //     pattern: "[789][0-9]{9}",
  //     required: true,
  //   },


  // ];

  const handleSubmit = (event) => {
    event.preventDefault();
    values.id = uuidv4();
    values.created_on = new Date().toDateString();
    // console.log(values)

    const baseURL = "http://localhost:8080/v1/customer/add";
    const newCustomer = {
      id: values.id,
      name: values.name,
      email: values.email,
      phone_number: values.phone,
      address: "home 5",
    };
    // console.log("hhhh", newCustomer)
    async function postCustomer() {
      try {
        const response = await axios.post(baseURL, newCustomer);
        console.log("post data: ", response.data);
      } catch (err) {
        console.error(err);
      }

    }

    postCustomer();
    dispatch({
      type: "ADD_CUSTOMER",
      payload: values,
    });

    // dispatch({
    //   type: "CHANGE_PAGE",
    //   payload: { page: "view_customer" },
    // });
    navigate('/');
  }


  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // console.log(values);
  };

  const navigate = useNavigate();

  return (
    <div className="app">
      <h1>New Customer</h1>
      <form className="CustomerForm" onSubmit={handleSubmit}>

        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="saveBtn">Save Customer</button>
      </form>
    </div>
  );

}

export default AddCustomerForm;