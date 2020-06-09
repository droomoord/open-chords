import React, { useState, useEffect } from "react";
import "./css/App.css";
import "./fonts/fonts.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Navigation from "./components/Navigation/Navigation";
import Sidebar from "./components/Sidebar/Sidebar";
import Browse from "./components/Pages/Browse";
import Search from "./components/Pages/Search";
import AddSong from "./components/Pages/AddSong";

import SideBrowse from "./components/SidebarContent/SideBrowse";
import SideSearch from "./components/SidebarContent/SideSearch";
import SideAddSong from "./components/SidebarContent/SideAddSong";

import UserContext from "./context/UserContext";

const App = () => {
  const [user, setuser] = useState({
    loggedIn: false,
    name: "",
    email: "",
  });

  const [showSidebar, setShowSidebar] = useState(false);

  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
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

  const logout = () => {
    Cookies.remove("jwt");
    setuser({
      loggedIn: false,
      email: "",
      password: "",
    });
  };

  const changeNewSong = (e) => {
    setNewSong({ ...newSong, [e.target.name]: e.target.value });
  };

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, setuser, logout }}>
          <Navigation />
          <div className="flex-row">
            <Sidebar
              showSidebar={showSidebar}
              setShowSidebar={() => setShowSidebar(!showSidebar)}
            >
              <Switch>
                <Route exact path="/">
                  root
                </Route>
                <Route exact path="/browse">
                  <SideBrowse />
                </Route>
                <Route exact path="/search">
                  <SideSearch />
                </Route>
                <Route exact path="/addsong">
                  <SideAddSong
                    changed={changeNewSong}
                    title={newSong.title}
                    artist={newSong.artist}
                  />
                </Route>
              </Switch>
            </Sidebar>

            <Switch>
              <Route exact path="/"></Route>
              <Route exact path="/browse">
                <Browse />
              </Route>
              <Route exact path="/search">
                <Search />
              </Route>
              <Route exact path="/addsong">
                <AddSong
                  showSidebar={() => setShowSidebar(true)}
                  title={newSong.title}
                  artist={newSong.artist}
                />
              </Route>
            </Switch>
          </div>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
