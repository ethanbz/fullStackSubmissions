import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Bloglist = ({ blog, likeBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div className='blogContainer' style={blogStyle}>
        <div className='blog'><Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link></div>
    </div>
  )
}

export default Bloglist
