import React, { useState } from 'react'

const BlogForm = ({ postBlog, setBlogFormVisible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handlePostBlog = async (e) => {
    e.preventDefault()
    if (await postBlog({ title, author, url })) {
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogFormVisible(false)
    }
  }
  return (
    <div className='blogForm'>
      <h2>create new</h2>
      <form onSubmit={handlePostBlog}>
        <div>
          title:
          <input type='text' name='Title' id='title' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input type='text' name='Author' id='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input type='text' name="Url" id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit' id='create-button'>create</button>
      </form>
      <button onClick={() => setBlogFormVisible(false)}>cancel</button>
    </div>
  )
}

export default BlogForm