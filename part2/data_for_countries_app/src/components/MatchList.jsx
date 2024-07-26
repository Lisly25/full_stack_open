import CountryDetailed from './CountryDetailed'
import { useState } from 'react'

const MatchList = (props) => {

	const showCountry = (event, index) => {
		event.preventDefault()
		props.setCountryToShow(index)
	}

	if (props.countryToShow !== -1)
	{
		const toShow = props.countryToShow
		return (
			<CountryDetailed country={props.filteredCountries[toShow]}/>
		)
	}
	if (!props.filter)
		return ;
	if (props.filteredCountries && props.countryCount === 1)
	{
		return (
			<CountryDetailed country={props.filteredCountries[0]}/>
		)
	}
	if (props.filteredCountries && props.countryCount > 10)
	{
		return (
			<div>
				Too many matches, specify another filter
			</div>
		)
	}
	if (props.filteredCountries && props.countryCount <= 10)
	{
		return (
			<ul>
        	{props.filteredCountries.map((country, index) => (
          	<li key={country.name.common}>
	            {country.name.common}<button onClick={(event) => showCountry(event, index)}>show</button>
          	</li>
        	))}
      		</ul>
		)
	}
	else
	{
		console.log('Filtered countries not available')
		return ;
	}
}

export default MatchList