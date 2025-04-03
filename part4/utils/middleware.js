const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer '))
  {
    request.token = authorization.replace('Bearer ', '')
  }
  else
  {
    request.token = null
  }

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError')
  {
    return response.status(400).send({ error: 'Malformed ID' })
  }
  if (error.name === 'ValidationError')
  {
    return response.status(400).send({ error: error.message })
  }
  if (error.name === 'TypeError')
  {
    return response.status(404).send({ error: `${error.message} - probably due to resource having been removed` })
  }
  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error'))
  {
    return response.status(400).json({ error: 'expected "username" to be unique' })
  }
  if (error.name === 'JsonWebTokenError')
  {
    return response.status(401).json({ error: 'token invalid' })
  }
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}