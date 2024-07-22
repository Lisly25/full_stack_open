import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleNewContact = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      id: String(persons.length + 1)
    };
    if (persons.find(query => query.name === person.name))
    {
      window.alert(`${newName} is already added to the phonebook`)
      return ;
     }
    setPersons(persons.concat(person));
    setNewName('');
  };

  const Person = ({ person }) => {
    return <div>{person.name}</div>;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewContact} />
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