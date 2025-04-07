import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null)
  {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}/>
        <LoginForm login={login} setUser={setUser} setMessage={setMessage} blogService={blogService}/>
      </div>
    )
  }
  else
  {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message}/>
        <h3>{user.username} logged in</h3><Logout setUser={setUser}/>
        <h2>create new blog</h2>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} blogService={blogService} setMessage={setMessage} setBlogs={setBlogs}/>
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} blogService={blogService} setMessage={setMessage} setBlogs={setBlogs} />
        )}
      </div>
    )
  }
}

export default App