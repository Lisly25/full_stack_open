const blogsRouter = require('express').Router()
const { process_params } = require('express/lib/router')
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')

//   if (authorization && authorization.startsWith('Bearer '))
//   {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id)
  {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  // const id = request.params.id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  const blog = await Blog.findById(request.params.id)

  if (decodedToken.id !== blog.user.toString())
  {
    return response.status(401).json({ error: 'token invalid - only creator can delete a blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { author, title, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)

  blog.author = author
  blog.title = title
  blog.url = url
  if (likes)
    blog.likes = likes

  await blog.save()
  response.json(blog)
})

module.exports = blogsRouter