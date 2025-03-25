const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})