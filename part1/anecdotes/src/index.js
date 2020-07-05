import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState({position: 0, votes: new Array(6).fill(0)})

  const changeValue = () => {
    let newVal = Math.floor(Math.random()*6)
    while (newVal === selected.position || newVal === 6) {
      newVal = Math.floor(Math.random()*6)
    }
    setSelected({...selected, position: newVal})
  }

  const incrementVotes = () => {
    let newVotes = [...selected.votes]
    newVotes[selected.position] += 1
    setSelected({...selected, votes: newVotes})
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected.position]}<br></br>
      has {selected.votes[selected.position]} votes<br></br>
      <Button handleClick={incrementVotes} text='vote' />
      <Button handleClick={changeValue} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Popular selected={selected} anecdotes={anecdotes} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Popular = (props) => {
  let index = 0;
  let mostVotes = 0;
  props.selected.votes.forEach(vote => {
    if (vote > mostVotes) {
      mostVotes = vote
      index = props.selected.votes.indexOf(vote)
    }
  })
  return (
    <div>
    {props.anecdotes[index]}<br></br>
    has {props.selected.votes[index]} votes<br></br>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)