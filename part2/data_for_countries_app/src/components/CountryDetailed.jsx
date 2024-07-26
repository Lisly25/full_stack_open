const CountryDetailed = (props) => {
	const languageValues = Object.values(props.country.languages)
	return (
		<div>
			<h1>{props.country.name.common}</h1>
			<p>capital {props.country.capital}</p>
			<p>area {props.country.area}</p>
			<h2>languages:</h2>
				<ul>
					{languageValues.map((language) => 
					<li key={language}>
						{language}
					</li>)}
				</ul>
		</div>
	)
}

export default CountryDetailed