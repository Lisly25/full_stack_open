const logger = require('./logger')


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
}

module.exports = {
    unknownEndpoint,
    errorHandler
}