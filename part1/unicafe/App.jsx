import { useState } from 'react';

const Button = (props) => {
  const onClick = props.onClick;
  const text = props.text;

  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = (props) => {
  const text = props.text;
  const value = props.value;

  if (text === 'positive') {
    return (
      <p>
        {text} {value} %
      </p>
    );
  }
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;

  const all = good + bad + neutral;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positivePercent = (good / all) * 100;

  if (good == 0 && neutral == 0 && bad == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positivePercent} />
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => setGood(good + 1);

  const addNeutral = () => setNeutral(neutral + 1);

  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={addGood} text="good" />
      <Button onClick={addNeutral} text="neutral" />
      <Button onClick={addBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
