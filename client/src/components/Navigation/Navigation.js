import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Usercontext from "../../context/UserContext";

const Navigation = () => {
  const user = useContext(Usercontext);
  return (
    <div>
      {user.loggedIn ? (
        <div style={{ float: "right" }}>Logged in as: {user.name}</div>
      ) : null}
      <ul>
        <li>
          <Link to="/browse">Browse</Link>
        </li>
        <li>
          <Link to="/mysongs">My songs</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
