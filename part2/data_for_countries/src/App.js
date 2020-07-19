import React, { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ target, setTarget ] = useState()

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setTarget();
  }

  const handleTarget = () => {
    return (
      <div>
      <h2>{target.name}</h2>
      <div>capital {target.capital}</div>
      <div>population {target.population}</div>
      <h3>languages</h3>
      <ul>
      {target.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
      <img alt='flag' src={target.flag} />
      </div>
    )
  }

  const handleFilter = () => {
    let filtered = countries.filter(country => country.name.toLowerCase().includes(search))
    if (filtered.length === 0 || search === '') {
      return ''
    } else if (filtered.length > 10) {
      return <div>Too many matches, specify another filter</div>
    } else if (filtered.length > 1) {
    return filtered.map(country => <div key={country.alpha2Code}>{country.name} <button onClick={() => setTarget(country)}>show</button></div>)
    } else {
      let country = filtered[0]
      return (
        <div>
        <h2>{country.name}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
        {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
        </ul>
        <img alt='flag' src={country.flag} />
        </div>
      )
    }
  }


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
        console.log(res.data)})
  }, [])

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      {target ? handleTarget() : handleFilter()}
    </div>  
  )
}

export default App;
