const Header = ({ course }) => <h2>{course}</h2>;

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

export default Course;