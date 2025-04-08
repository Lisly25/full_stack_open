import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  const blogs = response.data
  blogs.sort((a, b) => b.likes - a.likes)

  return blogs
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blogData, blogID) => {
  const response = await axios.put(`${baseUrl}/${blogID}`, blogData)
  return response.data
}

const deleteBlog = async blogID => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blogID}`, config)
}

export default { getAll, create, setToken, update, deleteBlog }