import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AppContext } from '../../context/Context';
import AddIcon from '@mui/icons-material/Add';
import "../../App.css";
import "../../formInput.css"
import axios from "axios";
import Pagination from "../../components/Pagination";
import CustomerTable from "../../components/Customer/CustomerTable";


function ViewCustomer({ changeCustomer }) {

  var searchCustomers = [];
  const { dispatch, customers } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const baseURL = "http://localhost:8080/v1/customer/customers";
  const [postsPerPage] = useState(2);
  const navigate = useNavigate();

  // useEffect(() => {
  //   async function getCustomers() {
  //     const response = await axios.get(baseURL);
  //     const customerFetched = response.data.customers;
  //     // console.log(customerFetched);

  //     const mappedCustomer = customerFetched.map((customer) => {
  //       return (
  //         {
  //           id: customer.Id,
  //           name: customer.Name,
  //           email: customer.Email,
  //           phone: customer.PhoneNumber,
  //           created_on: new Date(customer.CreatedAt).toUTCString().slice(5, 16),
  //         })

  //     });
  //     dispatch({
  //       type: "SET_CUSTOMERS",
  //       payload: mappedCustomer,
  //     });
  //   }

  //   if (customers.length === 0) { getCustomers(); }
  // }, [dispatch, customers]);

  const getCustomers = async () => {
    const response = await axios.get(baseURL);
    // console.log(response);
    const customerFetched = response.data.customers;
    // console.log("check customer", customerFetched);

    const mappedCustomer = customerFetched.map((customer) => {
      return (
        {
          id: customer.Id,
          name: customer.Name,
          email: customer.Email,
          phone: customer.PhoneNumber,
          created_on: new Date(customer.CreatedAt).toUTCString().slice(5, 16),
        })

    });
    dispatch({
      type: "SET_CUSTOMERS",
      payload: mappedCustomer,
    });

    // console.log("fetch customer", mappedCustomer);
    // if (customers.length === 0) { getCustomers(); }

  }

  if (customers.length === 0) { getCustomers() };



  //----------------------option---------------------------//
  const [option, setOption] = useState("");
  const handleChange = (event) => {
    setOption(prev => (prev = event.target.value));
  };


  //----------------------search---------------------------//
  const [query, setQuery] = useState("");
  const keys = [option];
  const Search = (customers) => {
    // console.log("query", query);
    return customers.filter((customer) =>
      keys.some((key) => typeof customer[key] === "string" && customer[key].toLowerCase().includes(query))
    );
  };
  searchCustomers = Search(customers);
  //----------------------pagination---------------------------//
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = searchCustomers.slice(indexOfFirstPost, indexOfLastPost);
  var currentPosts = [];
  if (searchCustomers.length == 0) {
    currentPosts = customers.slice(indexOfFirstPost, indexOfLastPost);

  }
  else {
    currentPosts = searchCustomers.slice(indexOfFirstPost, indexOfLastPost);

  }

  // const totalPosts = searchCustomers.length;

  const handleClick = (e) => {
    e.preventDefault()
    navigate("/addCustomer")
  }



  return (
    <div className="Customer">
      <div className="Heading">

        <h1 style={{ paddingLeft: 20 }}>Customers</h1>
        <p>
          <button id="icon" onClick={handleClick}><AddIcon /> New Customer</button>
        </p>
      </div>

      <div className="search">
        <input
          className="search"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
        <div className="customSelect" >
          <label>
            <select value={option} onChange={handleChange}>
              <option defaultValue={"options"}>Options</option>
              <option value={"name"}>NAME</option>
              <option value={"email"}>EMAIL</option>
            </select>
          </label>
        </div>
      </div>
      {/* {getCustomers} */}


      <div className="CustomerInfo">
        <CustomerTable customers={currentPosts} changeCustomer={changeCustomer} />
        <Pagination
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={searchCustomers.length}
          setCurrentPage={setCurrentPage}

        />
      </div>
    </div>
  );
}

export default ViewCustomer;