import { useParams } from "react-router-dom";

const BlogPage = ({ blogList }) => {
  const id = useParams().id;

  if (blogList.isLoading) {
    return <div>Loading page...</div>;
  } else {
    const blogData = blogList.data;
    const blog = blogData.find((n) => n.id === id);

    console.log("Blog data: ", blog);

    return (
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </div>
    );
  }
};

export default BlogPage;
