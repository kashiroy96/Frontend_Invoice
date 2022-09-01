import React, { useContext, useState } from "react";
import { AppContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import "../../Invoice.css";
import { v4 as uuidv4 } from "uuid";
import InvoiceBilling from "../../components/Invoice/InvoiceBilling";
import InvoiceIssuedForm from "../../components/Invoice/InvoiceIssuedForm";
import InvoiceItem from "../../components/Invoice/InvoiceItem";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import InvoicesItemTable from "../../components/Invoice/ItemInvoiceTable";
import TotalAmountTable from "../../components/Invoice/TotalAmountTable";
import ReceiptIcon from '@mui/icons-material/Receipt';
import axios from "axios";

const AddInvoiceForm = () => {
  const { customers, items, dispatch } = useContext(AppContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenItem, setModalIsOpenItem] = useState(false);
  const [itemList, setItemList] = useState([]);
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState({
    id: uuidv4(),
    CustomerId: "",
    InvoiceNumber: "",
    Items: [],
    Amount: 0,
    DueAmount: 0,
    IssueDate: "",
    DueDate: "",
    Notes: "",
    Status: "unpaid",
  });

  const [customerDetail, setCustomerDetail] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const changeCustomer = (customer) => {
    console.log(customer);
    setCustomerDetail({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
    })

    setInvoice({ ...invoice, CustomerId: customer.id });
  }

  const onClickAddItem = (item) => {
    var newItem = {
      id: item.id,
      name: item.name,
      quantity: 1,
      price: item.price,
      amount: item.price,
    }
    setItemList([...itemList, newItem]);
  }

  const onChangeNotes = (event) => {
    setInvoice({ ...invoice, [event.target.name]: event.target.value });
  };


  // const onSubmit = (event) => {
  //   event.preventDefault();
  // };


  const onSubmitHandler = (event) => {

    event.preventDefault();

    const invoicePayload = {

      customer_id: invoice.CustomerId,
      reference_number: invoice.InvoiceNumber,
      items: itemList.map((item) => {
        console.log(item);
        return { id: item.id, quantity: parseInt(item.quantity) };
      }),
      amount: invoice.Amount,
      due_date: parseInt(invoice.DueDate),
      notes: invoice.Notes,
      status: invoice.Status,
    };

    axios
      .post("http://localhost:8080/v1/invoice/", invoicePayload)
      .then((response) => {
        console.log("response data " + response.data);
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        }
      });


    dispatch({
      type: "ADD_INVOICE",
      payload: invoice,
    });
    console.log(invoice)

    navigate("/invoice");
  }

  return (
    <div className="Invoice">

      <div className="Header">

        <h1>New Invoice</h1>
        <button className="SubmitBtn" onClick={onSubmitHandler}> <ReceiptIcon /><p>Save Invoice</p></button>
      </div>
      <div className="First">
        <div>
          <div className="BillHeader"><p style={{ padding: 10 }}>Bill To</p></div>
          <div className="Bill">
            <div className="Address">
              <p >{customerDetail.name} </p>
              <p >{customerDetail.phone}</p>
              <p>{customerDetail.email} </p>
            </div>
            <button id="ChangeBtn" onClick={() => setModalIsOpen(true)}> Change</button>
            <InvoiceBilling
              customers={customers}
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              changeCustomer={changeCustomer}
            />
          </div>
        </div>
        <div className="Issued">
          <InvoiceIssuedForm invoice={invoice} setInvoice={setInvoice} />
        </div>
      </div>

      <div className="Second">
        <InvoicesItemTable invoice={invoice} setInvoice={setInvoice}
          itemList={itemList} setItemList={setItemList} />
        <button id="ItemBtn" onClick={() => setModalIsOpenItem(true)}><ShoppingBasketIcon /><p>Add an Item</p> </button>
        <InvoiceItem items={items}
          modalIsOpenItem={modalIsOpenItem}
          setModalIsOpenItem={setModalIsOpenItem}
          onClickAddItem={onClickAddItem} />

      </div>
      <div className="Third">
        <div>
          <p className="Pnotes">Notes</p>

          <textarea className="Notes"
            placeholder="Comments..."
            name="Notes"
            value={invoice.Notes}
            onChange={onChangeNotes}
          />

        </div>
        <div >
          <TotalAmountTable itemList={itemList} invoice={invoice} setInvoice={setInvoice} />

        </div>
      </div>

    </div>
  );

}

export default AddInvoiceForm;