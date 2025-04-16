import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const baseApiUrl = "https://studies.cs.helsinki.fi/restcountries/api/name"

  useEffect(() => {
    async function fetchData() {
      try
      {
        if (name.length === 0)
          return
        const response = await axios.get(`${baseApiUrl}/${name}`)
        setCountry({ found: true, ...response })
      }
      catch (exception)
      {
        if (name.length !== 0)
        {
          setCountry({ found: false })
          return
        }
        setCountry(null)
      }
    }
    fetchData()
  }, [name])

  return country
}

const Country = ({ country }) => {

  if (country === null) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    console.log("Fetching data")
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App