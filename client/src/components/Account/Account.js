import React, { Fragment, useState } from "react";
import Logout from "../Logout/Logout";
import Dropdown from "../utility/Dropdown/Dropdown";
import Backdrop from "../utility/Backdrop/Backdrop";

import "../../css/Account.css";

const Account = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Fragment>
      <div className="account" onClick={() => setShowDropdown(!showDropdown)}>
        {props.username.charAt(0)}
      </div>
      {showDropdown ? (
        <Fragment>
          <Dropdown
            links={[
              { name: "My Account", to: "/account" },
              { name: "My Songs", to: "/mysongs" },
              { name: "My Chords", to: "/mychords" },
              { name: "Log Out", to: "./logout" },
            ]}
            clicked={() => setShowDropdown(false)}
          />
          <Backdrop hidden clicked={() => setShowDropdown(false)} />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default Account;
