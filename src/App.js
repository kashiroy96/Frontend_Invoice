import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/Context';
import SharedLayout from './components/SharedLayout';
import ViewCustomer from './views/Customer/ViewCustomer';
import ViewItem from './views/Item/ViewItem';
import './App.css';
import AddItemForm from './views/Item/AddItem';
import AddCustomerForm from './views/Customer/AddCustomer';
import Home from './views/Home';
import ViewInvoice from './views/Invoice/ViewInvoice';
import AddInvoiceForm from './views/Invoice/AddInvoice';
// import Sidebar from './components/Sidebar';
// import ShowPages from './ShowPages';



function App(props) {
  // console.log("app", props.children)
  return (
    <AppProvider>
      {/* <div className="App">
      <Sidebar />
      <ShowPages />
    </div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="customer" element={<ViewCustomer />} />
            <Route path="addCustomer" element={<AddCustomerForm />} />
            <Route path="item" element={<ViewItem />} />
            <Route path="addItem" element={<AddItemForm />} />
            <Route path="invoice" element={<ViewInvoice />} />
            <Route path="addInvoice" element={<AddInvoiceForm />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </AppProvider>
  );
}

export default App;
