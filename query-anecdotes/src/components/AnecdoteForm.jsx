import { useQueryClient, useMutation } from '@tanstack/react-query';
import { newAnecdote } from '../requests';
import { useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: newAnecdote,
    onSuccess: (newObj) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newObj));
    },
    onError: (err) => {
      const errorMessage = err.response.data.error;
      dispatchNotification({
        type: 'SET_NOTIFICATION',
        payload: errorMessage,
      });
      setTimeout(() => {
        dispatchNotification({ type: 'UNSET_NOTIFICATION' });
      }, 5000);
    },
  });

  const onCreate = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value;

    e.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatchNotification({
      type: 'SET_NOTIFICATION',
      payload: 'anecdote was created!',
    });
    setTimeout(() => {
      dispatchNotification({ type: 'UNSET_NOTIFICATION' });
    }, 5000);

    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
