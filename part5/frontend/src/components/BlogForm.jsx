import { useState } from "react"

const BlogForm = ({ blogFormRef, blogService, setMessage, setBlogs }) => {
  
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleBlogCreation = async (event) => {
    event.preventDefault()

    try
    {
      const newBlog = {
        author: blogAuthor,
        title: blogTitle,
        url: blogUrl
      }
      const response = await blogService.create(newBlog)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      setMessage(`a new blog ${blogTitle} by ${blogAuthor} added`)
      setBlogAuthor('')
      setBlogTitle('')
      setBlogUrl('')
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception)
    {
      console.log(exception)
      setMessage('Blog creation failed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
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
  </form>)
}
export default BlogForm