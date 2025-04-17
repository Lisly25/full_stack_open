import { useState } from "react";
import { useNotificationDispatch } from "../contexts/NotificationContext";

const Blog = ({ blog, blogService, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatchNotification = useNotificationDispatch();

  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    visibility ? setVisibility(false) : setVisibility(true);
  };

  const likeBlog = async (event) => {
    event.preventDefault();

    try {
      const blogData = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      };

      await blogService.update(blogData, blog.id);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
    } catch (exception) {
      console.log(exception);
      dispatchNotification({ type: "LIKE_FAILED" });
      setTimeout(() => {
        dispatchNotification({ type: "NULL" });
      }, 5000);
    }
  };

  const handleBlogDelete = async (event) => {
    event.preventDefault();

    try {
      await blogService.deleteBlog(blog.id);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
      dispatchNotification({ type: "DELETE" });
      setTimeout(() => {
        dispatchNotification({ type: "NULL" });
      }, 5000);
    } catch (exception) {
      console.log(exception);
      dispatchNotification({ type: "DELETE_FAIL" });
      setTimeout(() => {
        dispatchNotification({ type: "NULL" });
      }, 5000);
    }
  };

  if (!visibility) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>view</button>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes}
        <button onClick={likeBlog}>like</button>
        <br />
        {blog.user.username}
        <br />
        {user.username === blog.user.username && (
          <button onClick={handleBlogDelete}>Remove</button>
        )}
      </div>
    );
  }
};

export default Blog;
