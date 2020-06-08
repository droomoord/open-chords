import React, { Fragment } from "react";

import Backdrop from "../Backdrop/Backdrop";

import "../../../css/Modal.css";

const Modal = (props) => {
  return (
    <Fragment>
      <div
        className={["modal", props.slideFade ? "slide-fade" : null].join(" ")}
      >
        {props.children}
      </div>
      <Backdrop clicked={props.clickedExit} />
    </Fragment>
  );
};

export default Modal;
