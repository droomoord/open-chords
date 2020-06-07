import React, { useContext } from "react";
import Cookies from "js-cookie";

import Usercontext from "../../context/UserContext";

const Logout = () => {
  const { setuser } = useContext(Usercontext);
  const logout = () => {
    Cookies.remove("jwt");
    setuser({
      loggedIn: false,
      email: "",
      password: "",
    });
  };
  return (
    <div>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default Logout;
