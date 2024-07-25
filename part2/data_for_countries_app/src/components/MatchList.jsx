const MatchList = (props) => {
	if (props.filteredCountries)
	{
		console.log(props.filteredCountries)
		return (
			<ul>
        	{props.filteredCountries.map((country) => (
          	<li key={country.name}>
	            {country.name}
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