import { useSelector, useDispatch } from 'react-redux';
import { updateVote, sortAnecdotes } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { createSelector } from '@reduxjs/toolkit';

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const vote = async (anecdote) => {
    dispatch(updateVote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  const sort = () => {
    dispatch(sortAnecdotes());
  };

  const selectFilteredAnecdotes = createSelector(
    [
      state => state.anecdotes,
      state => state.filter
    ],
    (anecdotes, filter) =>
      anecdotes.filter(anec => anec.content.includes(filter))
  );

  const anecdotes = useSelector(selectFilteredAnecdotes);

  return (
    <>
      <button onClick={sort}>sort</button>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AnecdoteList;
