const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.number}
      </p>
    </div>
  );
};

const Content = (props) => {
  const [first, second, third] = props.parts;

  return (
    <div>
      <p>
        <Part part={first.name} number={first.exercises} />
        <Part part={second.name} number={second.exercises} />
        <Part part={third.name} number={third.exercises} />
      </p>
    </div>
  );
};

const Total = (props) => {
  const [first, second, third] = props.parts;

  return (
    <div>
      <p>
        Number of exercises{' '}
        {first.exercises + second.exercises + third.exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
