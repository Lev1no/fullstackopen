import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  
    const existingPerson = persons.find(person => person.name === newName)
  
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(() => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')

            setSuccessMessage(`Added '${newName}'`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })

      }
    } else {
      const newPerson = { name: newName, number: newNumber, id: (persons.length + 1).toString() }
      
      personService
        .create(newPerson)
        .then(response => {
            setPersons(persons.concat(response.data))
            setNewName('')
            setNewNumber('')

            setSuccessMessage(`Added '${newName}'`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Failed to add '${newName}'. Try again later.`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })        
    }
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
  
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(prevPersons => prevPersons.filter(p => p.id !== id))
        })
        .catch(error => {
          setErrorMessage(`Information of '${person.name}' has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const filteredPersons = newFilter
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>

      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}

      <Filter value={newFilter} onChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm 
        onSubmit={handleSubmit}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />



      <h3>Numbers</h3>

      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  )
}

export default App
