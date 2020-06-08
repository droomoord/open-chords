import React, { useContext } from "react";
import UserContext from "../../../context/UserContext";
import { Link } from "react-router-dom";

import "../../../css/Dropdown.css";

const Dropdown = (props) => {
  const { logout } = useContext(UserContext);
  return (
    <div className="dropdown">
      {props.links.map((link, index) => {
        return (
          <li onClick={props.clicked} key={index}>
            <Link to={link.to}>{link.name}</Link>
          </li>
        );
      })}
      <li onClick={logout}>Log Out</li>
    </div>
  );
};

export default Dropdown;
