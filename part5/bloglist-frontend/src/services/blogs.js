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

const postNew = async newBlog => {
  console.log(token)
  const config = {
    headers: { Authorization: token },
  }
  console.log(newBlog)

  const res = await axios.post(baseUrl, newBlog, config)
  return res
}

export default { getAll, postNew, setToken }