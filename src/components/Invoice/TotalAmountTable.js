import React from "react";
import "../../Invoice.css"


const TotalAmountTable = ({ itemList }) => {

  var total = itemList.reduce((prev, curr) => prev + curr.amount, 0);
  // setInvoice({ ...invoice, Amount: total });
  console.log(total);
  return (
    <table className="AllItem">
      <tbody>
        {itemList.map((item) => (
          <tr className="tableRowAmount" key={item.id}>
            <td className="amountNameData">{item.name}</td>
            <td className="amountQuantityData">x{item.quantity}</td>
            <td className="amountPriceData">{item.price}</td>
          </tr>
        ))}
        <tr className="totalRowAmount">
          <td>Amount:</td>
          <td>{total}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default TotalAmountTable;