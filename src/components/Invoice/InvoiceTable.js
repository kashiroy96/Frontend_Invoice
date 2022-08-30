import React from "react";
import "../../formInput.css";
// import { AppContext } from '../../context/Context';
// import axios from "axios";

const InvoiceTable = ({ invoices, changeStatus }) => {
  // const { dispatch } = useContext(AppContext);
  // console.log(invoices);

  return (
    <table>
      <thead >
        <tr className="InvoiceTableHead">
          <th className="ivoiceth">DATE</th>
          <th className="ivoiceth"> CUSTOMERID</th>
          <th className="ivoiceth">NUMBER</th>
          <th className="ivoiceth"> PAID STATUS</th>
          <th className="ivoiceth">AMOUNT</th>
          <th className="ivoiceth">AMOUNT DUE</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => {
          // var items = invoice.InvoiceItems;
          // var total = items.reduce((prev, curr) => prev + curr.Price*curr.Quantity, 0);
          // console.log(total);
          return (
            <tr className="tableRowInvoice" key={invoice.id}>
              <td className="viewInvoicetd">{invoice.DueDate}</td>
              <td className="viewInvoicetd">{invoice.CustomerId}</td>
              <td className="viewInvoicetd">{invoice.InvoiceNumber}</td>
              <td className="viewInvoicetd"><button className="PaidBtn" onClick={() => changeStatus(invoice)}>{invoice.Status}</button></td>
              <td className="viewInvoicetd">{invoice.Amount}</td>
              <td className="viewInvoicetd">{ }</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default InvoiceTable;