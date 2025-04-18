import { useParams } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  useNotificationDispatch,
  useHideNotificationAfter_Time,
} from "../contexts/NotificationContext";
import { useUserValue } from "../contexts/UserContext";
import blogService from "../services/blogs";

const BlogPage = ({ blogList }) => {
  const id = useParams().id;
  const user = useUserValue();

  const dispatchNotification = useNotificationDispatch();
  const dispatchHideNotification = useHideNotificationAfter_Time();

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

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      dispatchNotification({ type: "DELETE" });
      dispatchHideNotification(5000);
      const oldBlogs = queryClient.getQueryData(["blogs"]);
      const newBlogs = oldBlogs.filter((n) => n.id !== id);
      queryClient.setQueryData(["blogs"], newBlogs);
    },
    onError: () => {
      dispatchNotification({ type: "DELETE_FAIL" });
      dispatchHideNotification(5000);
    },
  });

  if (blogList.isLoading) {
    return <div>Loading page...</div>;
  } else {
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

    const handleBlogDelete = async (event) => {
      event.preventDefault();
      deleteBlogMutation.mutate(blog.id);
    };

    const blogData = blogList.data;
    const blog = blogData.find((n) => n.id === id);

    return (
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <span>
          <br />
          {blog.likes} likes
          <button onClick={likeBlog}>like</button>
        </span>
        <p>Added by {blog.user.username}</p>
        {user.username === blog.user.username && (
          <button onClick={handleBlogDelete}>Remove</button>
        )}
      </div>
    );
  }
};

export default BlogPage;
