import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

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
      //blogService.setToken(user.token)
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
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception)
    {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null)
  {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      </div>
    )
  }
  else
  {
    return (
      <div>
        <h2>blogs</h2>
        <h3>{user.username} logged in</h3><Logout setUser={setUser}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App