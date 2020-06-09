import React, { useEffect, useContext } from "react";

import UserContext from "../../context/UserContext";

import "../../css/Song.css";

const AddSong = (props) => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    props.showSidebar();
  }, []);
  return user.loggedIn ? (
    <div className="song">
      <h1>{props.title}</h1>
      <h4>{props.artist}</h4>
    </div>
  ) : null;
};

export default AddSong;
