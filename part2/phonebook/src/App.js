import React, { useState } from 'react'
import PersonForm from "./components/PersonForm"
import Search from "./components/Search"
import Persons from "./components/Persons"

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length+1,
    }
    persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
    ? alert(`${newName} is already added to phonebook`)
    : setPersons(persons.concat(personObj));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumChange = (event) => {
    setNewNumber(event.target.value);
  }
  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Search newSearch={newSearch} handleSearch={handleSearch} />

      <h2>New entry</h2>

      <PersonForm 
        newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumChange={handleNumChange} addPerson={addPerson}
      />

      <h2>Numbers</h2>
        
      <Persons persons={persons} newSearch={newSearch} />

    </div>
  )
}

export default App
