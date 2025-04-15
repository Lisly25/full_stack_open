import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteForAnecdote } from './requests'
import { useNotificationDispatch } from './components/NotificationContext'

const App = () => {

  const queryClient = useQueryClient()

  const dispatch = useNotificationDispatch()

  const voteForAnecdoteMutation = useMutation({
    mutationFn: voteForAnecdote,
    onSuccess: (modifiedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => 
        anecdote.id !== modifiedAnecdote.id ? anecdote : modifiedAnecdote
      ))
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    voteForAnecdoteMutation.mutate(anecdote)
    dispatch({ type: 'VOTE', payload: anecdote.content })
    setTimeout(() => {
      dispatch({ type: 'NULL' })
    }, 5000)
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  if ( isPending ) {
    return <div>loading data...</div>
  }

  if ( isError ) {
    console.log(error)
    return <div>Anecdote service unavailable due to {error.message}</div>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
