import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUserValue, useUserDispatch } from "./contexts/UserContext";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
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
      <div>
        <h2>blogs</h2>
        <Notification />
        <h3>{user.username} logged in</h3>
        <Logout />
        <h2>create new blog</h2>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} blogService={blogService} />
        </Togglable>
        <div data-testid="blogs">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} blogService={blogService} />
          ))}
        </div>
      </div>
    );
  }
};

export default App;
