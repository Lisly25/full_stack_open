import { useState, useEffect } from 'react';
import phonebookService from './services/phonebook';
import ContactFilter from './components/ContactFilter';
import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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

  function getIdFromName(persons, targetName) {
    const person = persons.find(person => person.name === targetName)
    return person.id;
  } 

  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newPhoneNumber
    };
    if (persons.find(query => query.name === person.name))
    {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`))
      {
        phonebookService
          .update(getIdFromName(persons, person.name), person)
          .then(() => {
            phonebookService
              .getAll()
              .then (response => {
              setPersons(response.data)
         }
         )
          })
        return ;
      }
      else
        return ;
     }
    phonebookService
      .create(person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('');
        setNewPhoneNumber('');
      })
  };

  const removePerson = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`))
      phonebookService
        .remove(person.id)
        .then(() =>
         phonebookService
          .getAll()
          .then (response => {
            setPersons(response.data)
         }
         )
        )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactFilter filter={newFilter} eventHandler={handleNewFilter}/>
      <h3>Add a new contact</h3>
      <PersonForm name={newName} addNew={addPerson} newNameEventHandler={handleNewName} phoneNumber={newPhoneNumber} newPhoneNumberEventHandler={handleNewPhoneNumber}/>
      <h3>Numbers</h3>
      <Numbers filteredContacts={filteredPersons} removeEventHandler={removePerson}/>
    </div>
  );
};

export default App;