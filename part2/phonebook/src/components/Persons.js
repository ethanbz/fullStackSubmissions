import React from 'react'


const Persons = (props) => {
    return (
        props.persons.map(person => {
            if (props.newSearch) {
              if (person.name.toLowerCase().includes(props.newSearch)) return <div key={person.id}>{person.name} {person.number} <button onClick={props.remove}>delete</button></div>
            } else {
              return <div key={person.id}>{person.name} {person.number} <button onClick={() => props.remove(person.id, person.name)}>delete</button></div>
            }
            })
    )
}

export default Persons