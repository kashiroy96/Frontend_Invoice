import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from '../../context/Context';
import AddIcon from '@mui/icons-material/Add';
import "../../App.css";
import "../../formInput.css"
import InvoiceTable from "../../components/Invoice/InvoiceTable";
import axios from "axios";
import Pagination from "../../components/Pagination";

function ViewInvoice() {
  const { invoices, dispatch } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const baseURL = "http://localhost:8080/v1/invoice/";

  useEffect(() => {

    async function getInvoices() {
      const response = await axios.get(baseURL);
      const invoiceFetched = response.data;
      console.log(invoiceFetched);

      const mappedInvoice = invoiceFetched.map((invoice) => {
        return (
          {
            id: invoice.Id,
            CustomerId: invoice.CustomerId,
            InvoiceNumber: invoice.ReferenceNumber,
            Items: invoice.InvoiceItems,
            Amount: invoice.Amount,
            DueAmount: invoice.Status === "paid" ? 0 : invoice.Amount,
            Notes: invoice.Notes,
            DueDate: new Date(invoice.DueDate * 1000).toUTCString().slice(5, 16),
            Status: invoice.Status,
          })

      });
      dispatch({
        type: "SET_INVOICES",
        payload: mappedInvoice,
      });
    }
    if (invoices.length === 0) { getInvoices(); }
  }, []);


  const changeStatus = async (invoice) => {
    console.log(invoice);
    const invoiceId = invoice.id;
    const updatedStatus = invoice.Status === "paid" ? "unpaid" : "paid";
    const updatedDueAmount = invoice.Status === "paid" ? invoice.Amount : 0;
    try {
      const updateInvoiceRequest = await axios.patch(
        `http://localhost:8080/v1/invoice/?invoice_id=${invoiceId}&status=${updatedStatus}`
      );
      const tempInvoice = invoices.map((currInvoice) => {
        if (invoice.id === currInvoice.id) {
          return {
            ...currInvoice,
            Status: updateInvoiceRequest.data.Status,
            DueAmount: updatedDueAmount,
          };
        }
        return currInvoice;

      });


      dispatch({
        type: "SET_INVOICES",
        payload: tempInvoice,
      });

    } catch {
      console.log("bad request error - update invoice status");
    }
  }





  //----------------------option---------------------------//
  const [option, setOption] = useState("");
  const handleChange = (event) => {
    setOption(prev => (prev = event.target.value));
  };


  //----------------------search---------------------------//
  const [query, setQuery] = useState("");
  const keys = [option];
  const Search = (invoices) => {
    // console.log("query", query);
    return invoices.filter((invoice) =>
      keys.some((key) => typeof invoice[key] === "string" && invoice[key].toLowerCase().includes(query))
    );
  };
  const searchInvoices = Search(invoices);
  //----------------------pagination---------------------------//
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchInvoices.slice(indexOfFirstPost, indexOfLastPost);
  // const totalPosts = searchInvoices.length;
  // console.log(indexOfLastPost, indexOfFirstPost)

  // console.log(searchInvoices, currentPosts, totalPosts);


  return (
    <div className="Customer">
      <div className="Heading">
        <h1 style={{ paddingLeft: 20 }}>Invoices</h1>
        <p>
          <Link to="/addInvoice" style={{ textDecoration: 'none' }}>
            <button id="icon" className="InvoiceBtn" ><AddIcon /> New Invoice</button>
          </Link>
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
              <option value={"InvoiceNumber"}>NUMBER</option>
              <option value={"CustomerId"}>CUSTOMERID</option>
            </select>
          </label>
        </div>
      </div>

      <div className="CustomerInfo">
        <InvoiceTable invoices={currentPosts} changeStatus={changeStatus} />
        <Pagination
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={searchInvoices.length}
          setCurrentPage={setCurrentPage}

        />
      </div>
    </div>
  );
}

export default ViewInvoice;