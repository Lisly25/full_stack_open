import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
    axios.get(baseUrl).then(result => result.data)

export const createAnecdote = (newAnecdote) =>
    axios.post(baseUrl, newAnecdote).then(result => result.data)

export const voteForAnecdote = (anecdote) =>
    axios.patch(`${baseUrl}/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1}).then(result => result.data)