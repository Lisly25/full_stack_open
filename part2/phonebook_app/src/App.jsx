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

  const addPerson = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newPhoneNumber,
      //id: String(persons.length + 1)
    };
    if (persons.find(query => query.name === person.name))
    {
      window.alert(`${newName} is already added to the phonebook`)
      return ;
     }
    phonebookService
      .create(person)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('');
        setNewPhoneNumber('');
      })

/*     setPersons(persons.concat(person));
    setNewName('');
    setNewPhoneNumber(''); */
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactFilter filter={newFilter} eventHandler={handleNewFilter}/>
      <h3>Add a new contact</h3>
      <PersonForm name={newName} addNew={addPerson} newNameEventHandler={handleNewName} phoneNumber={newPhoneNumber} newPhoneNumberEventHandler={handleNewPhoneNumber}/>
      <h3>Numbers</h3>
      <Numbers filteredContacts={filteredPersons}/>
    </div>
  );
};

export default App;