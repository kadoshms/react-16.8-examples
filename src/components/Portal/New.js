import React from "react";
import './style.css';
import ReactDOM from "react-dom";

const ModalNew = (props) => (
  ReactDOM.createPortal(<div className={'overlay'}>
    <div className={'content'}>
      {props.children}
    </div>
  </div>, document.getElementById('modal'))
);

export default ModalNew;