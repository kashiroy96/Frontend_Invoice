import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/Context";
import { v4 as uuidv4 } from "uuid";
import FormInput from "../../components/FormInput";
import "../../formInput.css";
import axios from "axios";

const AddItemForm = () => {
  const { dispatch } = useContext(AppContext);

  const [values, setValues] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    added_on: "",
  });

  const inputs = [
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
      name: "price",
      type: "number",
      placeholder: "price",
      errorMessage: "Enter Price",
      label: "price",
      // pattern: "[789][0-9]{9}",
      required: true,
    },
    {
      id: 3,
      name: "description",
      type: "text",
      placeholder: "Description",
      errorMessage: "Enter Description",
      label: "description",
      required: true,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    values.id = uuidv4();
    values.added_on = new Date().toDateString();
    console.log(values)

    const baseURL = "http://localhost:8080/v1/item/add";
    const newItem = {
      id: values.id,
      name: values.name,
      stock: "105",
      price: values.price,
      isActive: true,
      description: values.description
    };
    // console.log("hhhh", newItem)
    async function postItem() {
      try {
        const response = await axios.post(baseURL, newItem);
        console.log("post data: ", response.data);
      } catch (err) {
        console.error(err);
      }

    }

    postItem();
    dispatch({
      type: "ADD_ITEM",
      payload: values,
    });

    // dispatch({
    //   type: "CHANGE_PAGE",
    //   payload: { page: "view_item" },
    // });
    navigate('/item');
  }

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };

  const navigate = useNavigate();



  return (
    <div className="app">
      <h1>New Item</h1>
      <form className="ItemForm" onSubmit={handleSubmit}>

        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className="saveBtn">Save Item</button>
      </form>
    </div>
  );

}

export default AddItemForm;