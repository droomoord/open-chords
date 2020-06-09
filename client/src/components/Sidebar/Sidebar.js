import React, { useState } from "react";
import "../../css/Sidebar.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Sidebar = (props) => {
  const { showSidebar, setShowSidebar } = props;
  return (
    <div className={["sidebar", showSidebar ? "open" : "close"].join(" ")}>
      <div className="pointer-container">
        <AiOutlineArrowLeft
          onClick={() => setShowSidebar(!showSidebar)}
          className={[
            "pointer-icon",
            showSidebar ? "point-left" : "point-right",
          ].join(" ")}
        />
      </div>
      {props.children}
    </div>
  );
};

export default Sidebar;
