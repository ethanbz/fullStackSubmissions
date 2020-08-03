import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [details, setDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div className='blogContainer' style={blogStyle}>
      {details
        ? <div className='details'>
          <div>{blog.title} - {blog.author} <button onClick={() => setDetails(!details)}>hide</button></div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></div>
          <div>posted by: {blog.user.name}</div>
          {user.name === blog.user.name && <button onClick={() => deleteBlog(blog)}>remove</button>}
        </div>
        : <div className='blog'>{blog.title} - {blog.author}<button onClick={() => setDetails(!details)}>view</button></div>
      }

    </div>
  )
}

export default Blog
