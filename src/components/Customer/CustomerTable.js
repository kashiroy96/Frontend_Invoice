
import React from "react";

const CustomerTable = ({ customers, changeCustomer }) => {

  return (
    <table>
      <thead >
        <tr className="tableHead">
          <th className="custth">NAME</th>
          <th className="custth">PHONE</th>
          <th className="custth">EMAIL</th>
          <th className="custth">CREATED ON</th>
        </tr>
      </thead>
      <tbody>
        {console.log(customers)}
        {customers.map((customer) => (
          <tr className="tableRow" key={customer.id} onClick={() => changeCustomer(customer)}>
            <td className="custtd" >{customer.name}</td>
            <td className="custtd">{customer.phone}</td>
            <td className="custtd">{customer.email}</td>
            <td className="custtd">{customer.created_on}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default CustomerTable;