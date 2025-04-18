import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useUserValue, useUserDispatch } from "./contexts/UserContext";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import UsersView from "./views/UsersView";
import BlogsView from "./views/BlogsView";
import blogService from "./services/blogs";
import login from "./services/login";

const App = () => {
  const blogFormRef = useRef();

  const user = useUserValue();
  const userDispatch = useUserDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const userJson = JSON.parse(loggedUserJSON);
      userDispatch({ type: "LOGIN", payload: userJson });
      blogService.setToken(userJson.token);
    }
  }, []);

  const blogList = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  });

  if (blogList.isLoading) {
    return <div>Loading blogs...</div>;
  }

  const blogs = blogList.data;

  const padding = {
    padding: 5,
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm login={login} blogService={blogService} />
      </div>
    );
  } else {
    return (
      <Router>
        <div>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          <span style={padding}>{user.username} logged in</span>
          <Logout />
          <Notification />
          <h2>Blog App</h2>
        </div>

        <Routes>
          <Route path="/users" element={<UsersView />} />
          <Route
            path="/"
            element={<BlogsView blogs={blogs} blogFormRef={blogFormRef} />}
          />
        </Routes>
      </Router>
    );
  }
};

export default App;
