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
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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

  return (
    <div>
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
