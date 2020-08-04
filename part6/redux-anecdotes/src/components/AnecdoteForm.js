import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/notifcationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(content))
        dispatch(setMessage(`you created new anecdote "${content}"`))
        setTimeout(() => {
            dispatch(removeMessage())
        }, 5000)
        
    }
    return (
        <div>
            <h2>create new</h2>
            <form  onSubmit={(ev) => create(ev)}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm