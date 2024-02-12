const Course = ({ course }) => {

  const Header = (props) => {
    return (
      <div>
        <h3>{props.name}</h3>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        <Part parts={props.parts} />
      </div>
    )
  }
  
  const Part = (props) => {
    const { parts } = props
    return (
      <div>
        {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      </div>
    )
  }

  const Total = ({ total }) => {
    const totalExercises = total.reduce(
      (total, part) => total + part.exercises, 0
    )
    return (
      <div>
        <strong>total of {totalExercises} exercises</strong>
      </div>
    )
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total total={course.parts}/>
    </div>
  )
}

export default Course