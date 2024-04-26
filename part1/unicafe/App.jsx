import { useState } from 'react';

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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positivePercent} %</p>
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
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
