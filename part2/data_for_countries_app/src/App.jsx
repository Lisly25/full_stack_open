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
    console.log('fetching country list..')
    CountryService
      .getAll()
      .then(response => {
        console.log(`response status: ${response.status}`)
        console.log(`response status: ${response.headers}`)
        console.log(response.data[1].name.common)
        setAllCountries(response.data)
        //console.log(`Printing content of all countries: ${allCountries}`)
      })
  }, [])

  useEffect(() => {
    if (newFilter)
    {
      console.log("Trying to find the names of countries: ")
      console.log(allCountries[0].name.common)
      const newCountryList = allCountries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
      setNewCountryList(newCountryList)
    }
  }, [newFilter, allCountries])

  const handleNewFilter = (event) => {
    //console.log(event.target.value)
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