import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

//const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

const orderAnecdotes = (anecdotes) => {
  return anecdotes.slice().sort((a, b) => b.votes - a.votes)
}

//const initialState = orderAnecdotes(anecdotesAtStart.map(asObject))

const initialState = []

// export const voteActionCreator = (id) => {
//   console.log('vote', id)
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export const createAnecdoteActionCreator = (content) => {
//   console.log(content)
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action.type)
//   switch (action.type) {
//     case 'VOTE': {
//       const id = action.payload.id
//       const anecdoteToChange = state.find(n => n.id === id)
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1
//       }
//       return orderAnecdotes(state.map(anecdote =>
//         anecdote.id !== id ? anecdote : changedAnecdote 
//       ))
//     }
//     case 'NEW_ANECDOTE':
//       return orderAnecdotes(state.concat(action.payload))
//     default: return orderAnecdotes(state)
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    voteForAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return orderAnecdotes(state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      ))
    },
    // createAnecdote(state, action) {
    //   return orderAnecdotes(state.concat(action.payload))
    // },
    appendAnecdote(state, action) {
      state.push(action.payload)
      orderAnecdotes(state)
    },
    setAnecdotes(state, action) {
      return orderAnecdotes(action.payload)
    }
  }
})

export const initalizeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const { voteForAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer