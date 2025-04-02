const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username ||  username.length < 3)
    {
        return response.status(400).json({ error: 'a username that is at least 3 charaters long is required' })
    }
    if (!password || password.length < 3)
    {
        return response.status(400).json({ error: 'a password that is at least 3 charaters long is required' })
    }
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
  
    const savedUser = await user.save()
  
    response.status(201).json(savedUser)
  })
  
  usersRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.json(users)
  })

  module.exports = usersRouter