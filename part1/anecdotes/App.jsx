import { useState } from 'react';

const NextButton = (props) => {
  const onClick = props.onClick;
  const text = props.text;

  return <button onClick={onClick}>{text}</button>;
};

const VoteButton = (props) => {
  const onClick = props.onClick;
  const text = props.text;

  return <button onClick={onClick}>{text}</button>;
};

const VoteCountDisplay = (props) => {
  const selected = props.selected;
  const votes = props.votes;
  const count = votes[selected];

  return <p>has {count} votes</p>;
};

const Header = (props) => {
  const text = props.text;

  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

const DisplayFavouriteAnecdote = (props) => {
  const votes = props.votes;
  let maxValue = votes[0];
  let maxIndex = 0;
  const anecdotes = props.anecdotes;

  for (let i = 0; i < votes.length; i++) {
    if (votes.at(i) > maxValue) {
      console.log(maxIndex);
      maxValue = votes[i];
      maxIndex = i;
    }
  }

  if (maxValue === 0) return;
  return (
    <div>
      <p>{anecdotes[maxIndex]}</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getAnecdote = () => {
    const min = 0;
    const max = anecdotes.length - 1;
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    setSelected(random);
  };

  const voteForAnecdote = () => {
    const newVotes = { ...votes };
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <VoteCountDisplay selected={selected} votes={votes} />
      <VoteButton onClick={voteForAnecdote} text="vote" />
      <NextButton onClick={getAnecdote} text="next anecdote" />
      <Header text="Anecdote with the most notes" />
      <DisplayFavouriteAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
