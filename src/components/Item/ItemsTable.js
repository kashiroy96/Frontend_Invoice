import React from "react";

const ItemsTable = ({ items, onClickAddItem }) => {


  return (
    <table>
      <thead >
        <tr className="tableHead">
          <th className="nametd">NAME</th>
          <th className="destd"> DESCRIPTION</th>
          <th className="pricetd">PRICE</th>
          <th className="addtd"> ADDED ON</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr className="tableRowItem" key={item.id} onClick={() => onClickAddItem(item)}>
            <td className="nametd">{item.name}</td>
            <td className="destd">{item.description}</td>
            <td className="pricetd">{item.price}</td>
            <td className="addtd">{item.added_on}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ItemsTable;