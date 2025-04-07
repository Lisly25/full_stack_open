const BlogForm = ({blogTitle, setBlogTitle, blogAuthor, setBlogAuthor, blogUrl, setBlogUrl, handleBlogCreation}) => (
  <form onSubmit={handleBlogCreation}>
    <div>
      title
        <input type="text" value={blogTitle} onChange={({target}) => setBlogTitle(target.value)} />
    </div>
    <div>
      author
        <input type="text" value={blogAuthor} onChange={({target}) => setBlogAuthor(target.value)} />
    </div>
    <div>
      url
        <input type="text" value={blogUrl} onChange={({target}) => setBlogUrl(target.value)} />
    </div>
    <button type="submit">create</button>
  </form>
)

export default BlogForm