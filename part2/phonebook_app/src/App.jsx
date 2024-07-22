import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '+55 555 555 55'}]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewPhoneNumber = (event) => {
    console.log(event.target.value);
    setNewPhoneNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newPhoneNumber,
      id: String(persons.length + 1)
    };
    if (persons.find(query => query.name === person.name))
    {
      window.alert(`${newName} is already added to the phonebook`)
      return ;
     }
    setPersons(persons.concat(person));
    setNewName('');
    setNewPhoneNumber('');
  };

  const Person = ({ person }) => {
    return <div>{person.name} {person.number}</div>;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newPhoneNumber} onChange={handleNewPhoneNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            <Person person={person}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;