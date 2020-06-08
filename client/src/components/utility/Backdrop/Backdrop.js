import React from "react";

import "../../../css/Backdrop.css";

const Backdrop = (props) => {
  return (
    <div
      className={["backdrop", props.hidden ? "hidden" : null].join(" ")}
      onClick={props.clicked}
    ></div>
  );
};

export default Backdrop;
