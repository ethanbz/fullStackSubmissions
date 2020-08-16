import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../reducers/notificationReducer'

const Blog = ({ likeBlog, deleteBlog, user }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const [blog, setBlog] = useState(null)
  const notification = useSelector(state => state.notification)
  
  const getBlog = async () => {
    const blog = await blogService.get(id)
    console.log(blog)
    setBlog(blog)
  }
  useEffect(() => {
    getBlog()
  }, [notification])
  
  const postComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    await blogService.postComment(comment, id)
    dispatch(setMessage('comment posted!'))
  }
  
  



    return (<>
      {blog && <div>
        <div className='details'>
          <h2>{blog.title} - {blog.author}</h2>
          <div><a href='#'>{blog.url}</a></div>
          <div>likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></div>
          <div>posted by: {blog.user.name}</div>
          {user.username === blog.user.username && <button onClick={() => deleteBlog(blog)}>remove</button>}
          <h3>comments</h3>
          <form onSubmit={(ev) => postComment(ev)}>
            <input name='comment' />
            <input type='submit' value='add comment' />
          </form>
          <ul>
            {blog.comments && blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
          </ul>
        </div>
      </div>}
    </>)
}

export default Blog
