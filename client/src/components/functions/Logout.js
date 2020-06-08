import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

import Usercontext from "../../context/UserContext";

const Logout = () => {
  const { user, setuser } = useContext(Usercontext);
  Cookies.remove("jwt");
  setuser({
    loggedIn: false,
    email: "",
    password: "",
  });
  return <Redirect to={"/"} />;
};

export default Logout;
