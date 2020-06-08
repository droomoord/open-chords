import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import Login from "../Login/Login";
import Register from "../Register/Register";
import Account from "../Account/Account";

import Usercontext from "../../context/UserContext";

import "../../css/Navigation.css";

const Navigation = (props) => {
  const { user } = useContext(Usercontext);
  const navLinks = [
    { name: "Browse", to: "/browse" },
    { name: "My Songs", to: "/mysongs" },
  ];
  return (
    <nav className="navbar">
      {navLinks.map((link, index) => {
        return (
          <li key={index}>
            <NavLink
              className="navbar-link"
              to={link.to}
              activeClassName="selected"
            >
              {link.name}
            </NavLink>
          </li>
        );
      })}
      <div className="navbar-info">
        {user.loggedIn ? <Account username={user.name} /> : null}
        {!user.loggedIn ? <Login /> : null}
        {!user.loggedIn ? <Register /> : null}
      </div>
    </nav>
  );
};

export default Navigation;
