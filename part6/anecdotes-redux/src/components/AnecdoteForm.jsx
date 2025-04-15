import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
//import anecdoteService from '../../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdoteHandler = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(content))
    dispatch(setNotification(`Added anecdote "${content}"`, 5))
    // dispatch(showNotification(`Added anecdote "${content}"`))
    // setTimeout(() => {
    //   dispatch(hideNotification())
    // }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdoteHandler}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm