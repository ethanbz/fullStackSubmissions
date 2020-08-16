import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = (id) => {
  const req = axios.get(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

const postNew = async newBlog => {
  console.log(token)
  const config = {
    headers: { Authorization: token },
  }
  console.log(newBlog)

  const res = await axios.post(baseUrl, newBlog, config)
  return res
}

const postComment = async (comment, id) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return res
}

const likeBlog = async blog => {
  const likedBlog = {
    user: blog.user.id,
    likes: blog.likes+1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  const res = await axios.put(`${baseUrl}/${blog.id}`, likedBlog)
  return res
}

const remove = async blog => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return res
}

export default { getAll, postNew, setToken, likeBlog, remove, postComment, get }