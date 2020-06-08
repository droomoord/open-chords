import React from "react";
import { Link } from "react-router-dom";

import "../../../css/Dropdown.css";

const Dropdown = (props) => {
  return (
    <div className="dropdown">
      {props.links.map((link) => {
        return (
          <li onClick={props.clicked}>
            <Link to={link.to}>{link.name}</Link>
          </li>
        );
      })}
    </div>
  );
};

export default Dropdown;
