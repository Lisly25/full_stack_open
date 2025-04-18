import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  useNotificationDispatch,
  useHideNotificationAfter_Time,
} from "../contexts/NotificationContext";
import { useUserValue } from "../contexts/UserContext";

const Blog = ({ blog, blogService }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const user = useUserValue();

  const dispatchNotification = useNotificationDispatch();
  const dispatchHideNotification = useHideNotificationAfter_Time();

  const [visibility, setVisibility] = useState(false);

  const toggleVisibility = () => {
    visibility ? setVisibility(false) : setVisibility(true);
  };

  const queryClient = useQueryClient();

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const oldBlogs = queryClient.getQueryData(["blogs"]);
      const blogs = oldBlogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b,
      );
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      queryClient.setQueryData(["blogs"], sortedBlogs);
    },
    onError: () => {
      dispatchNotification({ type: "LIKE_FAILED" });
      dispatchHideNotification(5000);
    },
  });

  const likeBlog = async (event) => {
    event.preventDefault();

    const blogData = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    likeBlogMutation.mutate([blogData, blog.id]);
  };

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      dispatchNotification({ type: "DELETE" });
      dispatchHideNotification(5000);
      const oldBlogs = queryClient.getQueryData(["blogs"]);
      const newBlogs = oldBlogs.filter((n) => n.id !== blog.id);
      queryClient.setQueryData(["blogs"], newBlogs);
    },
    onError: () => {
      dispatchNotification({ type: "DELETE_FAIL" });
      dispatchHideNotification(5000);
    },
  });

  const handleBlogDelete = async (event) => {
    event.preventDefault();
    deleteBlogMutation.mutate(blog.id);
  };

  if (!visibility) {
    return (
      <div style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
        <button onClick={toggleVisibility}>view</button>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
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
