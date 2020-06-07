import React, { useState, useEffect } from "react";
import "./css/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Navigation from "./components/Navigation/Navigation";
import Browse from "./components/Pages/Browse";
import MySongs from "./components/Pages/MySongs";

import UserContext from "./context/UserContext";

const App = () => {
  const [user, setuser] = useState({
    loggedIn: false,
    name: "",
    email: "",
  });

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
        <UserContext.Provider value={{ user, setuser }}>
          <Navigation />
          <Switch>
            <Route exact path="/browse" component={Browse} />
            <Route exact path="/mysongs" component={MySongs} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
