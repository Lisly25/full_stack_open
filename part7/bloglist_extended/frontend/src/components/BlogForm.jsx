import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  useNotificationDispatch,
  useHideNotificationAfter_Time,
} from "../contexts/NotificationContext";

const BlogForm = ({ blogFormRef, blogService }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const dispatchNotification = useNotificationDispatch();
  const dispatchHideNotification = useHideNotificationAfter_Time();

  const queryClient = useQueryClient();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const oldBlogs = queryClient.getQueryData(["blogs"]);
      const blogs = oldBlogs.concat(newBlog);
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      queryClient.setQueryData(["blogs"], sortedBlogs);
    },
    onError: () => {
      dispatchNotification({ type: "CREATE_FAIL" });
      dispatchHideNotification(5000);
    },
  });

  const handleBlogCreation = async (event) => {
    event.preventDefault();
    const newBlog = {
      author: blogAuthor,
      title: blogTitle,
      url: blogUrl,
    };
    newBlogMutation.mutate(newBlog);
    dispatchNotification({ type: "CREATE", payload: { ...newBlog } });
    setBlogAuthor("");
    setBlogTitle("");
    setBlogUrl("");
    blogFormRef.current.toggleVisibility();
    dispatchHideNotification(5000);
  };

  return (
    <form onSubmit={handleBlogCreation}>
      <div>
        title
        <input
          data-testid="new-blog-title"
          type="text"
          value={blogTitle}
          onChange={({ target }) => setBlogTitle(target.value)}
          id="title-input"
        />
      </div>
      <div>
        author
        <input
          data-testid="new-blog-author"
          type="text"
          value={blogAuthor}
          onChange={({ target }) => setBlogAuthor(target.value)}
          id="author-input"
        />
      </div>
      <div>
        url
        <input
          data-testid="new-blog-url"
          type="text"
          value={blogUrl}
          onChange={({ target }) => setBlogUrl(target.value)}
          id="url-input"
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};
export default BlogForm;
