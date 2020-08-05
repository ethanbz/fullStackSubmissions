import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE': 
      const changedAnecdote = action.data
      return state.map(an => an.id !== changedAnecdote.id ? an : changedAnecdote).sort((a, b) => a.votes > b.votes ? -1 : 1)
    case 'NEW':
      const newAnecdote = action.data
      return state.concat(newAnecdote)
    case 'INIT':
      return action.data
  }

  return state
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.addVote({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'VOTE',
      data: changedAnecdote
    })
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addNew(asObject(content))
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
    
  } 
}

export default anecdoteReducer