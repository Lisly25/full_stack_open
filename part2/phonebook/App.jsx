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
      id: String(notes.length + 1),
    };
    setPersons(persons.concat(person));
    setNewName('');
  };

  const Person = ({ person }) => {
    return <li>{person.name}</li>;
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
          <Person key={(contact.id, (id = contact))} />
        ))}
      </ul>
    </div>
  );
};

export default App;

