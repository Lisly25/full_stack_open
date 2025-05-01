import { LOGIN } from "../queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => console.log(error),
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("graphql-library-user-token", token);
    }
  }, [result.data]);

  const loginHandler = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
    setPassword("");
    setUsername("");
  };

  if (!show) {
    return null;
  } else {
    return (
      <div>
        <h2>Log in to the website</h2>
        <form onSubmit={loginHandler}>
          <div>
            username:
            <input
              id="username-field"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password:
            <input
              id="pword-field"
              value={password}
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
};

export default LoginForm;
