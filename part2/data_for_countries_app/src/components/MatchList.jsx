import CountryDetailed from './CountryDetailed'

const MatchList = (props) => {

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
        	{props.filteredCountries.map((country) => (
          	<li key={country.name.common}>
	            {country.name.common}
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