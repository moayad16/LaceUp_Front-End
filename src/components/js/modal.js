import React from "react";
import { useState } from "react";


function Modal(props) {

    const [show, setShow] = useState(props.modal_vis);

    return (
      <div style={{display: show}} className="modal" tabindex="1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button 
              onClick={() => setShow("none")}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>PRODUCT ADDED TO CART!</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Modal;