import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';

    dispatch(setNotification(`new anecdote ${content}`, 5));
  };

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit" >create</button>
    </form>
  );
};

export default AnecdoteForm;
