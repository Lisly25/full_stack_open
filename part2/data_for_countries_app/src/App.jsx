import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import CountryService from './services/data_for_countries'
import MatchList from './components/MatchList'

const App = () => {
  const [newFilter, setNewFilter] = useState('');
  const [newCountryList, setNewCounrtyList] = useState([])
  let allCountries = [];

  useEffect(() => {
   /*  if (newFilter) { */
      console.log('fetching country list..')
      CountryService
        .getAll()
        .then(response => {
          allCountries = response.data.name
        })

    /* } */
  }, [])

  const filteredCountries = newFilter ?
    allCountries.filter(country => country.toLowerCase().includes(newFilter.toLowerCase())) :
    null

  const handleNewFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <SearchForm name={newFilter} eventHandler={handleNewFilter}/>
      <MatchList filteredCountries={filteredCountries}/>
    </div>
  )
}

export default App