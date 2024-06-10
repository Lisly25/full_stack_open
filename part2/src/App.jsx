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

const AllCourses = ({ courses }) => (
  <ul>
    {courses.map((course) => (
      <li key={course.id}>
        <Course course={course} />
      </li>
    ))}
  </ul>
);

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Web development curriculum</h1>
      <AllCourses courses={courses} />
    </div>
  );
};

export default App;
