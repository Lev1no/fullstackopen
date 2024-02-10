import { useState } from 'react'

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td colSpan = "2">{props.text}</td>
      <td colSpan= "2">{props.value}</td>
    </tr>
  )
}

const Statistic = (props) => {
  const goodStat = props.value[0]
  const neutralStat = props.value[1]
  const badStat = props.value[2]
  const all = goodStat + neutralStat + badStat
  const average = (goodStat - badStat) / all
  const positive = (goodStat / all) * 100
  
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={goodStat} />
          <StatisticLine text='neutral' value={neutralStat} />
          <StatisticLine text='bad' value={badStat} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive + '%'} />
        </tbody>
      </table>
    )
  }
}  
const App = () => {
  // Anecdotes bank
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)
  const [anecdoteVotes, setAnecdoteVotes] = useState(new Array(8).fill(0))

  const increaseGood = () => {
    console.log('value of good before', good)
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    console.log('value of neutral before', neutral)
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    console.log('value of bad before', bad)
    setBad(bad + 1)
  }

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const newVotes = [...anecdoteVotes]
    newVotes[selected] += 1
    setAnecdoteVotes(newVotes)
    console.log('copy', newVotes)
  }

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {anecdoteVotes[selected]} votes</p>
      <Button handleClick={vote} text='vote' />
      <Button handleClick={randomAnecdote} text='next anecdote' />
      <h1>Anecdotes with most votes</h1>
      <p>{anecdotes[anecdoteVotes.indexOf(Math.max(...anecdoteVotes))]}</p>
      <p>has {Math.max(...anecdoteVotes)} votes</p>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text='good' />
      <Button handleClick={increaseNeutral} text='neutral' />
      <Button handleClick={increaseBad} text='bad' />
      <h1>statistics</h1>
      <Statistic value={[good, neutral, bad]} />
    </div>
  )
}

export default App
