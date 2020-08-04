import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/notifcationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = ({ id, content }) => {
        dispatch(voteAnecdote(id))
        dispatch(setMessage(`you voted "${content}"`))
        setTimeout(() => {
            dispatch(removeMessage())
        }, 5000)
    }

    return (
        <div>
            {anecdotes.filter(anecdote => filter ? anecdote.content.toLowerCase().includes(filter) : anecdote).map(anecdote => 
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
        </div>
    )
}

export default AnecdoteList