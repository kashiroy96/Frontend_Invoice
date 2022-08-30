import React from "react";
import Modal from "react-modal";
import ViewItem from "../../views/Item/ViewItem";
import "../../App.css";
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

const InvoiceItem = ({ modalIsOpenItem, setModalIsOpenItem, onClickAddItem }) => {

  return (
    <div >
      <Modal isOpen={modalIsOpenItem}
        style={customStyles}
        ariaHideApp={false}>
        <ViewItem onClickAddItem={onClickAddItem} />
        <div>
          <button className="ModalCloseBtn" onClick={() => setModalIsOpenItem(false)}> close </button>
        </div>
      </Modal >
    </div >
  );

}

export default InvoiceItem;