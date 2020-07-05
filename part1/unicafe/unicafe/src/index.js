import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementValue = (value, setValue) => () => {
    setValue(value+1)
  }

  return (
    <div>
      <Header />
      <Button handleClick={incrementValue(good, setGood)} text='good' />
      <Button handleClick={incrementValue(neutral, setNeutral)} text='neutral' />
      <Button handleClick={incrementValue(bad, setBad)} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Header = () => (
  <h1>give feedback</h1>
)

const Button = ({ handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) return ('No feedback given')
  
  return (
  <table> 
    <tbody>
    <Stat text='good' value={good} />
    <Stat text='neutral' value={neutral} />
    <Stat text='bad' value={bad} />
    <Stat text='all' value={good+neutral+bad} />
    <Stat text='average' value={(good-bad)/(good+neutral+bad) || 0} />
    <Stat text='positive' value={((good)/(good+neutral+bad)*100 || 0) + '%'} />
    </tbody>
  </table>
  )
}

const Stat = ({text, value}) => (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )

ReactDOM.render(<App />, 
  document.getElementById('root')
)
