import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const filteredPersons = newFilter ?
    persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())) :
    persons

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
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
      <div>
        filter shown with: <input value={newFilter} onChange={handleNewFilter}/>
      </div>
      <h2>Add a new contact</h2>
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
        {filteredPersons.map((person) => (
          <li key={person.name}>
            <Person person={person}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;