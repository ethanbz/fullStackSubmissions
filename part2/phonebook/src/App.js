import React, { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Search from "./components/Search"
import Persons from "./components/Persons"
import service from "./services/phonebook"

const Notification = ({ msg }) => {
  if (msg === null) return null

  return (
    <div className='err'>{msg}</div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [message, setMessage] = useState(null)

  const handleMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 15000)
  }

  useEffect(() => {
    service
      .getAll()
      .then(info => setPersons(info))
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObj = {
      name: newName,
      number: newNumber,
    }
    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added to phonebook, update the number?`)) {
        service.update(persons.find(person => person.name.toLowerCase() === newName), newNumber)
          .then(returnedPerson => setPersons(persons.map(person => person.name !== newName ? person : returnedPerson)))
          .then(info => handleMessage(`number for ${newName} has been updated`)).catch(err => handleMessage(`Information for ${newName} has already been removed from the server`))
      }
    } else service.add(personObj).then(info => setPersons(persons.concat(info)))
            .then(info => handleMessage(`${newName} has been added`)).catch(err => {
              handleMessage(`Error: could not add ${newName} ---- ${err.response.data.error}`)
              console.log(err.response)
            })
    setNewName('');
    setNewNumber('');
  }

  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      service.remove(id).then(info => handleMessage(`${name} has been deleted`)).catch(err => handleMessage(`${name} has already been deleted from the server`))
      setPersons(persons.filter(person => person.id !== id))
    }
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

      <Notification msg={message} />
      
      <Search newSearch={newSearch} handleSearch={handleSearch} />

      <h2>New entry</h2>

      <PersonForm 
        newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumChange={handleNumChange} addPerson={addPerson}
      />

      <h2>Numbers</h2>
        
      <Persons persons={persons} newSearch={newSearch} remove={removePerson}/>

    </div>
  )
}

export default App
