import { useState } from "react";
import {
  useNotificationDispatch,
  useHideNotificationAfter_Time,
} from "../contexts/NotificationContext";

const LoginForm = ({ login, setUser, blogService }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatchNotification = useNotificationDispatch();
  const dispatchHideNotification = useHideNotificationAfter_Time();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatchNotification({ type: "LOGIN" });
      dispatchHideNotification(5000);
    } catch (exception) {
      console.log(exception);
      dispatchNotification({ type: "LOGIN_FAIL" });
      dispatchHideNotification(5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
