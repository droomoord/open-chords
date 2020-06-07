import React, { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import LoginFields from "./LoginFields/LoginFields";

import Usercontext from "../../context/UserContext";

const Login = (props) => {
  const { setuser } = useContext(Usercontext);

  const tryLogin = async (e, loginFields) => {
    try {
      e.preventDefault();
      if (!loginFields.email || !loginFields.password) {
        alert("please provide an email and a password");
        return;
      }
      const { data } = await axios({
        method: "post",
        url: "/users/auth",
        data: loginFields,
      });
      Cookies.set("jwt", data.accessToken, { expires: 7 });
      setuser({ ...data.user, loggedIn: true });
    } catch (error) {
      alert(error.response.data.error.message);
    }
  };

  return (
    <LoginFields tryLogin={(e, loginFields) => tryLogin(e, loginFields)} />
  );
};

export default Login;
