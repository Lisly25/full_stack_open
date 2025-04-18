import Togglable from "../components/Togglable";
import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";
import blogService from "../services/blogs";

const BlogsView = ({ blogs, blogFormRef }) => {
  return (
    <div>
      <h2>create new blog</h2>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} blogService={blogService} />
      </Togglable>
      <div data-testid="blogs">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogsView;
