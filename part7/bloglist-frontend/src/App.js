import React, { useState, useEffect } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import Bloglist from './components/Bloglist'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)
  const message = useSelector(state => state.notification)


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogFormVisible===false, message==='blog liked', message==='blog deleted'])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(setMessage('login successful'))
    } catch (error) {
      console.log(error)
      dispatch(setMessage('invalid username or password'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
  }

  const postBlog = async (newBlog) => {
    try {
      const res = await blogService.postNew(newBlog)
      if (res.status === 201) {
        console.log(res)
        dispatch(setMessage('blog successfuly posted!'))
        return true
      }
    } catch (error) {
      console.log(error)
      dispatch(setMessage('error posting blog'))
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

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setMessage('blog liked'))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`delete ${blog.title}?`)) {
      dispatch(deleteBlog(blog))
      dispatch(setMessage('blog deleted'))
    }
  }

  const blogForm = () => (
    <BlogForm postBlog={postBlog} setBlogFormVisible={setBlogFormVisible} />
  )

  const bloglist = () => (
    <div>
      {blogFormVisible ? blogForm() : <button onClick={() => setBlogFormVisible(!blogFormVisible)}>create new blog</button>}
      {blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1).map(blog =>
        <Bloglist key={blog.id} blog={blog} user={user} likeBlog={handleLike} deleteBlog={handleDelete} />
      )}
    </div>
  )

  const notification = () => (
      <div style={{ color: 'blue', fontSize: 24 }}>
        {message}
      </div>
    )

  const navbar = () => {
    const style = {
      display: 'flex',
      backgroundColor: 'lightgray',
      padding: '5px',
      justifyContent: 'space-between',
      width: '300px',
    }
    return (
    <div style={style}>
      <NavLink to='/'>blogs</NavLink>
      <NavLink to='/users'>users</NavLink>
      <div>{user.name} logged-in <button onClick={handleLogout}>logout</button> </div>
    </div>
  )
  }
  
  

  return (
    <div>
      {user === null ? loginForm() : navbar()}
      <h2>blog app</h2>
      {notification()}
      
      <Switch>
        <Route exact path='/'>
          {bloglist()}
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <Blog blogs={blogs} user={user} likeBlog={handleLike} deleteBlog={handleDelete}/>
        </Route>
      </Switch>
    </div>
  )
}

export default App