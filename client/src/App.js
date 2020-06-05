import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Browse from "./components/Pages/Browse";
import MySongs from "./components/Pages/MySongs";

import UserContext from "./context/UserContext";

const App = () => {
  const [user, setuser] = useState({
    loggedIn: false,
    name: "",
    email: "",
  });

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
      console.log(error);
    }
  };

  const logout = () => {
    Cookies.remove("jwt");
    setuser({
      loggedIn: false,
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    const getUser = async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: "/users/me",
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setuser({ ...data, loggedIn: true });
      } catch (error) {
        console.log(error);
      }
    };
    if (jwt) getUser();
  }, []);

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={user}>
          <Navigation />
          {!user.loggedIn ? (
            <Login submitted={(e, loginFields) => tryLogin(e, loginFields)} />
          ) : (
            <button onClick={logout}>Log out</button>
          )}
          {!user.loggedIn ? (
            <Register
              submitted={(e, registerFields) => tryRegister(e, registerFields)}
            />
          ) : null}
          <Switch>
            <Route exact path="/browse">
              <Browse />
            </Route>
            <Route exact path="/mysongs">
              <MySongs />
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
