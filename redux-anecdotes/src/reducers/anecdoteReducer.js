import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    addVote(state, action) {
      return state.map((anec) =>
        anec.id === action.payload.id
          ? action.payload
          : anec);
    },
    sortAnecdotes(state, action) {
      return state.sort((anec1, anec2) => {
        return anec2.votes - anec1.votes});
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const res = await anecdoteService.getAll();
    dispatch(setAnecdotes(res));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const updateVote = (anecdote) => {
  return async (dispatch) => {
    const newAnec = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const returnedAnecdote = await anecdoteService.update(anecdote.id, newAnec);
    dispatch(addVote(returnedAnecdote));
  };
};

export const {
  addVote,
  sortAnecdotes,
  setAnecdotes,
  appendAnecdote,
} = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
