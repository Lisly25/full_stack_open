import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import CountryService from './services/data_for_countries'
import MatchList from './components/MatchList'

const App = () => {
  const [newSearch, setNewSearch] = useState('');
  const [newFilter, setNewFilter] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [newCountryList, setNewCountryList] = useState([...allCountries])
 
  useEffect(() => {
    CountryService
      .getAll()
      .then(response => {
        setAllCountries(response.data)
      })
      .catch(error => {
        console.log(`An error occured fetching the country list: ${error}`)
      })
  }, [])

  useEffect(() => {
    if (newFilter)
    {
      const newCountryList = allCountries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
      setNewCountryList(newCountryList)
    }
  }, [newFilter, allCountries])

  const handleNewFilter = (event) => {
    setNewSearch(event.target.value)
    setNewFilter(event.target.value)
  }

   return (
     <div>
      <SearchForm name={newSearch} eventHandler={handleNewFilter}/>
      <MatchList filteredCountries={newCountryList} countryCount={newCountryList.length} filter={newFilter}/>
    </div>
  )
}

export default App