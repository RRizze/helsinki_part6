import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAnecdotes, addVotes } from './requests';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  useNotificationDispatch,
} from './NotificationContext';

const App = () => {

  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();

  const newVotesMutation = new useMutation({
    mutationFn: addVotes,
    onSuccess: () => {
      queryClient.invalidateQueries(['anecdotes']);
    },
  });
  const handleVote = (anecdote) => {
    newVotesMutation.mutate({...anecdote, votes: anecdote.votes + 1 });
    dispatchNotification({
      type: 'SET_NOTIFICATION',
      payload: `anecdote '${anecdote.content}' voted!`,
    });

    setTimeout(() => {
      dispatchNotification({ type: 'UNSET_NOTIFICATION' });
    }, 5000);

    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (result.isError) {
    return (
      <div>Anecdote service not available due to problems in server.</div>
    );
  } else if (result.isPending) {
    return (
      <div>loading data...</div>
    );
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {result.data.map(anecdote =>
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
