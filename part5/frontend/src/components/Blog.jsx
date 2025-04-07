import { useState } from "react"

const Blog = ({ blog }) => {
  
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
        {blog.likes}<button>like</button><br/>
        {blog.user.username}<br/>
      </div>  
    )
  }
}

export default Blog