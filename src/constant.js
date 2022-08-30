
const PAGES = {
  ADD_CUSTOMER: "ADD_CUSTOMER",
  SET_CUSTOMER: "SET_CUSTOMERS",
  ADD_ITEM: "ADD_ITEM",
  SET_ITEMS: "SET_ITEMS",
  ADD_INVOICE: "ADD_INVOICE",
  SET_INVOICES: "SET_INVOICES",
}

const initialState = {
  customers: [],
  items: [],
  // currentPage: "view_customer",
  invoices: [],
};

export { PAGES, initialState };