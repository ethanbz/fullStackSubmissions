import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)
  const [message, setMessage] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogFormVisible===false, message==='blog liked', message==='blog deleted'])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('login successful')
    } catch (error) {
      console.log(error)
      setMessage('invalid username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const postBlog = async (newBlog) => {
    try {
      const res = await blogService.postNew(newBlog)
      if (res.status === 201) {
        console.log(res)
        setMessage('blog successfuly posted!')
        return true
      }
    } catch (error) {
      console.log(error)
      setMessage('error posting blog')
      return false
    }

  }

  const loginForm = () => {

    return (
      <div>
        {!loginVisible ?
          <div>
            <button onClick={() => setLoginVisible(true)}>log in</button>
          </div>
          : <div>
            <LoginForm
              username={username}
              password={password}
              handleLogin={handleLogin}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
            />
            <button onClick={() => setLoginVisible(false)}>cancel</button>
          </div>
        }
      </div>
    )
  }

  const handleLike = async (blog) => {
    await blogService.likeBlog(blog)
    setMessage('blog liked')
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`delete ${blog.title}?`)) {
      await blogService.remove(blog)
      setMessage('blog deleted')
    }
  }

  const blogForm = () => (
    <BlogForm postBlog={postBlog} setBlogFormVisible={setBlogFormVisible} />
  )

  const bloglist = () => (
    <div>
      <p>{user.name} logged-in <button onClick={handleLogout}>logout</button> </p>
      {blogFormVisible ? blogForm() : <button onClick={() => setBlogFormVisible(!blogFormVisible)}>create new blog</button>}
      {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} likeBlog={handleLike} deleteBlog={handleDelete} />
      )}
    </div>
  )

  const notification = () => {
    setTimeout(() => {
      setMessage('')
    }, 5000)
    return (
      <div style={{ color: 'blue', fontSize: 24 }}>
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message && notification()}
      {user === null ? loginForm() : bloglist()}
    </div>
  )
}

export default App