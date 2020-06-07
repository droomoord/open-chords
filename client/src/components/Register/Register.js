import React, { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import RegisterFields from "./RegisterFields/RegisterFields";

import Usercontext from "../../context/UserContext";

const Register = (props) => {
  const { setuser } = useContext(Usercontext);

  const tryRegister = async (e, registerFields) => {
    try {
      e.preventDefault();
      if (registerFields.password !== registerFields.password2) {
        alert("Passwords do not match");
        return;
      }
      const { data } = await axios({
        method: "post",
        url: "/users",
        data: registerFields,
      });
      setuser({ ...data.user, loggedIn: true });
      Cookies.set("jwt", data.accessToken, { expires: 7 });
    } catch (error) {
      if (error.response.data.error) {
        alert(error.response.data.error.message);
      } else {
        console.log(error);
        alert(
          "Something went wrong... Please let me know at: heijnenkris@gmail.com"
        );
      }
    }
  };

  return (
    <RegisterFields
      tryRegister={(e, registerFields) => tryRegister(e, registerFields)}
    />
  );
};

export default Register;
