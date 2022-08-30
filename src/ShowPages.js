import React, { useContext } from "react";
import AddCustomerForm from "./views/AddCustomer";
import ViewCustomer from "./views/ViewCustomer";
import AddItemForm from "./views/AddItem";
import ViewItem from "./views/ViewItem";
import { AppContext } from "./context/Context";

const PAGES = {
  ADD_CUSTOMER: "add_customer",
  VIEW_CUSTOMER: "view_customer",
  ADD_ITEM: "add_item",
  VIEW_ITEM: "view_item",
}

const ShowPages = () => {
  const { currentPage } = useContext(AppContext);
  // console.log("item here", currentPage);
  switch (currentPage) {
    case PAGES.VIEW_CUSTOMER:
      return (
        <ViewCustomer />
      )

    case PAGES.ADD_CUSTOMER:
      return (
        <AddCustomerForm />
      )
    case PAGES.VIEW_ITEM:
      return (
        <ViewItem />
      )

    case PAGES.ADD_ITEM:
      return (
        <AddItemForm />
      )

    default: {
      return (
        console.log("Fall Back to default case")
      )
    }
  }
}

export default ShowPages;
