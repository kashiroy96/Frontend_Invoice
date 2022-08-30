import React from "react";
import Modal from "react-modal";
import ViewCustomer from "../../views/Customer/ViewCustomer";
import "../../Invoice.css"

const customStyles = {
  content: {
    position: 'absolute',
    width: '700px',
    height: '500px',
    top: '10%',
    left: '20%',
    transform: 'translate(-50 %, -50 %)',
    border: '1px solid #ccc',
    background: 'white',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px 20px',
    marginLeft: '50px',

  }
};

function InvoiceBilling({ modalIsOpen, setModalIsOpen, changeCustomer }) {
  // const { customers } = useContext(AppContext);
  return (
    <div >
      <Modal isOpen={modalIsOpen}
        style={customStyles}
        ariaHideApp={false}>
        <ViewCustomer changeCustomer={changeCustomer} />
        <div>
          <button className="ModalCloseBtn" onClick={() => setModalIsOpen(false)}> close </button>
        </div>
      </Modal >
    </div >

  );
}

export default InvoiceBilling;