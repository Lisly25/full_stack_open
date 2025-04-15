import { useDispatch, useSelector } from "react-redux";
import { castVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter.length === 0)
    {
      return state.anecdotes
    }
    else
    {
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  })
  
  const vote = (id) => {
    const selectedAnecdote = anecdotes.find(n => n.id === id)
    dispatch(castVote(selectedAnecdote))
    dispatch(setNotification(`Voted for "${selectedAnecdote.content}"`, 5))
  //   dispatch(showNotification(`Voted for "${selectedAnecdote.content}"`))
  //   setTimeout(() => {
  //     dispatch(hideNotification())
  //   }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList