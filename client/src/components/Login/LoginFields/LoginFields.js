import React, { useState, Fragment } from "react";

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
        <form
          onSubmit={(e) => tryLogin(e, loginFields)}
          onChange={(e) =>
            setLoginFields({ ...loginFields, [e.target.name]: e.target.value })
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
      ) : null}
    </Fragment>
  );
};

export default LoginFields;
