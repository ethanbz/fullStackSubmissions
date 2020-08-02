import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogform, setBlogform] = useState(false)
  const [message, setMessage] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [, blogform===false])

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

  const handlePostBlog = async (e) => {
    e.preventDefault()
    try {
    const res = await blogService.postNew({ title, author, url })
    if (res.status === 201) {
      setTitle('')
      setAuthor('')
      setUrl('')
      console.log(res)
      setBlogform(false)
      setMessage('blog successfuly posted!')
    }
  } catch (error) {
    console.log(error)
      setMessage('error posting blog')
  }
    
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handlePostBlog}>
        <div>
          title:
          <input type='text' name='Title' onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input type='text' name='Author' onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input type='text' name="Url" onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

  const bloglist = () => (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in <button onClick={handleLogout}>logout</button> </p> 
      {blogform ? blogForm() : <button onClick={() => setBlogform(!blogform)}>create new blog</button>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const notification = () => {
    setTimeout(() => {
      setMessage('')
    }, 5000)
    return (
    <div style={{color: 'blue', fontSize: 24}}>
    {message}
    </div>
    )
  }

  return (
    <div>
      {message && notification()}
      {user === null ? loginForm() : bloglist()}
    </div>
  )
}

export default App