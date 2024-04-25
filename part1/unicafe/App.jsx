import { useState } from 'react';

const Button = (props) => {
  const text = props.text;

  return <button>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addRating = (props) => {
    const addValue = props.function;
    const type = props.type;
    const newValue = props.newValue;
    addValue(newValue);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" />
      <Button text="neutral" />
      <Button text="bad" />
      <h1>Statistics</h1>
    </div>
  );
};

export default App;
