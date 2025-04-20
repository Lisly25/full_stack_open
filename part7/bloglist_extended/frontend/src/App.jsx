import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useUserValue, useUserDispatch } from "./contexts/UserContext";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import UsersView from "./views/UsersView";
import BlogsView from "./views/BlogsView";
import UserProfile from "./views/UserProfile";
import BlogPage from "./views/BlogPage";
import blogService from "./services/blogs";
import usersService from "./services/users";
import login from "./services/login";

//Styles
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  Typography,
} from "@mui/material";

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

  const users = useQuery({
    queryKey: ["users"],
    queryFn: usersService.getUsers,
    refetchOnWindowFocus: false,
  });

  if (blogList.isLoading) {
    return <div>Loading blogs...</div>;
  }

  const blogs = blogList.data;

  const padding = {
    padding: 5,
  };

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  if (user === null) {
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Typography variant="h2">Log in to application</Typography>
          <Notification />
          <LoginForm login={login} blogService={blogService} />
        </ThemeProvider>
      </Container>
    );
  } else {
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Router>
            <AppBar>
              <Toolbar>
                <Button color="inherit" component={Link} to="/">
                  blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  users
                </Button>
                <span style={padding}>{user.username} logged in</span>
                <Logout />
              </Toolbar>
            </AppBar>

            <div style={{ paddingTop: "60px" }}>
              <Notification />
              <Typography variant="h2">Blog App</Typography>
            </div>

            <Routes>
              <Route path="/users" element={<UsersView users={users} />} />
              <Route
                path="/"
                element={<BlogsView blogs={blogs} blogFormRef={blogFormRef} />}
              />
              <Route
                path="/users/:id"
                element={<UserProfile users={users} />}
              />
              <Route
                path="/blogs/:id"
                element={<BlogPage blogList={blogList} />}
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </Container>
    );
  }
};

export default App;
