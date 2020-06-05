import React, { useState } from "react";

const Register = (props) => {
  const [registerFields, setRegisterFields] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [showRegisterFields, setShowRegisterFields] = useState(false);
  return (
    <div>
      <button onClick={() => setShowRegisterFields(!showRegisterFields)}>
        Register
      </button>
      {showRegisterFields ? (
        <form
          style={{ display: "inline" }}
          onSubmit={(e) => props.submitted(e, registerFields)}
          onChange={(e) =>
            setRegisterFields({
              ...registerFields,
              [e.target.name]: e.target.value,
            })
          }
        >
          <input
            type="text"
            name="name"
            placeholder="Your name, or nickname"
            value={registerFields.name}
            autoComplete="none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerFields.email}
            autoComplete="none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerFields.password}
          />
          <input
            type="password"
            name="password2"
            placeholder="Verify your password"
            value={registerFields.password2}
          />

          <input type="submit" />
        </form>
      ) : null}
    </div>
  );
};

export default Register;
