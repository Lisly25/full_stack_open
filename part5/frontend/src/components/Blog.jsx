import { useState } from "react"

const Blog = ({ blog, blogService, setMessage, setBlogs }) => {
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    visibility ? setVisibility(false) : setVisibility(true)
  }

  const likeBlog = async (event) => {
    event.preventDefault()

    try
    {
      const blogData = {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }

      const response = await blogService.update(blogData, blog.id)
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)

    }
    catch (exception)
    {
      console.log(exception)
      setMessage('Failed to like blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (!visibility)
  {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div> 
    )
  }
  else
  {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button><br/>
        {blog.url}<br/>
        {blog.likes}<button onClick={likeBlog}>like</button><br/>
        {blog.user.username}<br/>
      </div>  
    )
  }
}

export default Blog