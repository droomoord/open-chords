import React, { useContext } from "react";

import UserContext from "../../context/UserContext";

const SideAddSong = (props) => {
  const { user } = useContext(UserContext);

  return user.loggedIn ? (
    <div>
      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={props.changed}
        value={props.title}
        autoComplete="off"
      />
      <input
        type="text"
        placeholder="Artist"
        name="artist"
        onChange={props.changed}
        value={props.artist}
        autoComplete="off"
      />
      <button>Start adding chords!</button>
    </div>
  ) : (
    <div>Please login or register to add a song!</div>
  );
};

export default SideAddSong;
