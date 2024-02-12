const Course = ({ course }) => {
  const Header = (props) => {
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }
  
const Content = (props) => {
  return (
    <div>
      <Part course={props.parts} />
    </div>
  )
}
  
const Part = (props) => {
  const { course } = props
  return (
    <div>
      {course.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
    </div>
  )
}

const Total = ({ total }) => {
  const totalExercises = total.reduce(
    (total, part) => total + part.exercises, 0
  )
  return (
    <div>
      <strong>total of {totalExercises}</strong>
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