import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [message, setMessage] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try
    {
      const user = await login({username, password})
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('You logged in successfully')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch (exception)
    {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

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

  if (user === null)
  {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}/>
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
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
        <BlogForm handleBlogCreation={handleBlogCreation} blogAuthor={blogAuthor} setBlogAuthor={setBlogAuthor} blogTitle={blogTitle} setBlogTitle={setBlogTitle} blogUrl={blogUrl} setBlogUrl={setBlogUrl}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App