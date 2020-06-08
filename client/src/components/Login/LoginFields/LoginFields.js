import React, { useState, Fragment } from "react";

import Modal from "../../utility/Modal/Modal";

import "../../../css/form.css";

const LoginFields = (props) => {
  const { tryLogin } = props;

  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });

  const [showLoginFields, setShowLoginFields] = useState(false);
  return (
    <Fragment>
      <button onClick={() => setShowLoginFields(!showLoginFields)}>
        Login
      </button>
      {showLoginFields ? (
        <Modal slideFade clickedExit={() => setShowLoginFields(false)}>
          <form
            className="form"
            onSubmit={(e) => tryLogin(e, loginFields)}
            onChange={(e) =>
              setLoginFields({
                ...loginFields,
                [e.target.name]: e.target.value,
              })
            }
          >
            <input
              type="email"
              name="email"
              placeholder="email"
              value={loginFields.email}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={loginFields.password}
            />
            <input type="submit" />
          </form>
        </Modal>
      ) : null}
    </Fragment>
  );
};

export default LoginFields;
