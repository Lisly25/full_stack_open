const express = require('express')
const app = express()

app.use(express.json())

let contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const getCurrentTimestamp = () => {
  const date = new Date()
  timestamp = `${date.toUTCString()}`
  return timestamp
}

const generateID = () => {
  id = Math.floor(Math.random() * 1000000000)
  return id
}

app.get('/info', (request, response) => {
  response.send(`<div><p>Phonebook has info for ${contacts.length} people</p><p>${getCurrentTimestamp()}</p></div>`)
})

app.get('/api/persons', (request, response) => {
    response.json(contacts)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const contact = contacts.find(contact => contact.id === id)

  if (contact)
  {
    response.json(contact)
  }
  else
  {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const delete_id = request.params.id
  contacts = contacts.filter(contact => contact.id !== delete_id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log("Request body:", body)

  if (!body.name || !body.number)
  {
    return response.status(400).json({
      error: 'Body is missing required fields.'
    })
  }

  const contact = {
    id: generateID(),
    name: body.name,
    number: body.number
  }

  contacts = contacts.concat(contact)

  response.json(contact)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})