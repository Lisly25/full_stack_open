const CountryDetailed = (props) => {
	return (
		<div>
			<h1>{props.country.name.common}</h1>
			<p>capital {props.country.capital}</p>
			<p>area {props.country.area}</p>
		</div>
	)
}

export default CountryDetailed