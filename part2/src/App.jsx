const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, part) => {
    return accumulator + part.exercises;
  }, 0);

  return <p>total of {sum} exercises</p>;
};

const Part = ({ part }) => (
  <>
    {part.name} {part.exercises}
  </>
);

const Content = ({ parts }) => (
  <ul>
    {parts.map((part) => (
      <li key={part.id}>
        <Part part={part} />
      </li>
    ))}
  </ul>
);

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  };
  
  return <Course course={course} />;
};

export default App;
