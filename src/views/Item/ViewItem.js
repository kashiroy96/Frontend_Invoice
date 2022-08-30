import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from '../../context/Context';
import AddIcon from '@mui/icons-material/Add';
import "../../App.css";
import "../../formInput.css"
import axios from "axios";
import Pagination from "../../components/Pagination";
import ItemsTable from "../../components/Item/ItemsTable";


function ViewItem({ onClickAddItem }) {

  const { dispatch, items } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const baseURL = "http://localhost:8080/v1/item/items";
  const [postsPerPage] = useState(2);


  useEffect(() => {
    async function getItems() {
      const response = await axios.get(baseURL);
      console.log(response);
      const itemFetched = response.data.items;
      console.log(itemFetched);

      const mappedItem = itemFetched.map((item) => {
        return (
          {
            id: item.Id,
            name: item.Name,
            description: item.Description,
            price: item.Price,
            added_on: new Date(item.CreatedAt).toUTCString().slice(5, 16),
          })

      });
      dispatch({
        type: "SET_ITEMS",
        payload: mappedItem,
      });
    }

    if (items.length === 0) { getItems(); }
  }, [dispatch, items]);



  //----------------------option---------------------------//
  const [option, setOption] = useState("");
  const handleChange = (event) => {
    setOption(prev => (prev = event.target.value));
  };


  //----------------------search---------------------------//
  const [query, setQuery] = useState("");
  const keys = [option];
  const Search = (items) => {
    // console.log("query", query);
    return items.filter((item) =>
      keys.some((key) => typeof item[key] === "string" && item[key].toLowerCase().includes(query))
    );
  };

  const searchItems = Search(items);
  //----------------------pagination---------------------------//
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchItems.slice(indexOfFirstPost, indexOfLastPost);
  // const totalPosts = searchItems.length;
  // console.log("searchItems", searchItems);



  //-----------------------------------------------------------//

  // console.log("idhr", items);
  return (
    <div className="Customer">
      <div className="HeadingItem">
        <h1 style={{ paddingLeft: 15 }}>Items</h1>
        <p>
          <Link to="/addItem" style={{ textDecoration: 'none' }}>
            <button className="ItemBtn" id="icon" ><AddIcon /> Add Item</button>
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
            <select className="SelectBox" value={option} onChange={handleChange}>
              <option defaultValue={"options"}>Options</option>
              <option value={"name"}>NAME</option>
              <option value={"description"}>DESCRIPTION</option>
            </select>
          </label>
        </div>
      </div>



      <div className="CustomerInfo">
        <ItemsTable items={currentPosts} onClickAddItem={onClickAddItem} />
        <Pagination
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={searchItems.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ViewItem;