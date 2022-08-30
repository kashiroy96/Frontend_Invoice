import React from "react";

import "../../Invoice.css";
import DeleteIcon from '@mui/icons-material/Delete';

const InvoicesItemTable = ({ invoice, setInvoice, itemList, setItemList }) => {


  const onChangeItem = (e, item) => {

    setItemList((current) =>
      current.map((invoiceItem) => {
        if (invoiceItem.id === item.id) {
          return {
            ...invoiceItem,
            quantity: e.target.value,
            amount: item.price * e.target.value,
          };
        }
        return invoiceItem;
      })
    );
    setInvoice({ ...invoice, Items: itemList, Amount: itemList.reduce((prev, curr) => prev + curr.amount, 0) });

  }

  const itemDeleteHandler = (row) => {
    console.log(row);
    console.log(itemList);

    const updatedItemList = itemList.filter((item) => row.id !== item.id);
    setItemList(updatedItemList);
  };

  return (
    <table>
      <thead >
        <tr className="tableHeadInvoice">
          <th className="itemth">Items</th>
          <th className="itemth">Quantity</th>
          <th className="itemth">Price</th>
          <th className="itemth">Amount</th>
        </tr>
      </thead>
      <tbody>
        {itemList.map((item) => {
          return (
            <tr className="tableRowInvoiceItem" key={item.id} >
              <td className="itemIntd" >{item.name}</td>
              <td className="itemIntd"><input className="ItemQInput" type="number"
                value={item.quantity} onChange={(e) => onChangeItem(e, item)} />
              </td>
              <td className="itemIntd">{item.price}</td>
              <td className="itemIntd">{item.amount}
                <button className="itemInDeltd" onClick={() => (itemDeleteHandler(item))}>
                  < DeleteIcon />
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default InvoicesItemTable;