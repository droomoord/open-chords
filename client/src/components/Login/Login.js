import React, { useState } from "react";

const Login = (props) => {
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });
  const [showLoginFields, setShowLoginFields] = useState(false);
  return (
    <div>
      <button onClick={() => setShowLoginFields(!showLoginFields)}>
        Login
      </button>
      {showLoginFields ? (
        <form
          style={{ display: "inline" }}
          onSubmit={(e) => props.submitted(e, loginFields)}
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
    </div>
  );
};

export default Login;
