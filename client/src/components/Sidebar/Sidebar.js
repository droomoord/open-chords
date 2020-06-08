import React, { useState } from "react";
import "../../css/Sidebar.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className={["sidebar", showSidebar ? "open" : "close"].join(" ")}>
      <AiOutlineArrowLeft
        onClick={() => setShowSidebar(!showSidebar)}
        className={[
          "pointer-icon",
          showSidebar ? "point-left" : "point-right",
        ].join(" ")}
      />
    </div>
  );
};

export default Sidebar;
