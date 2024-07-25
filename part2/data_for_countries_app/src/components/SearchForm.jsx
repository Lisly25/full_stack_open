const SearchForm = (props) => {

	return (
		<div>
			<form>
				find countries: <input value={props.name} onChange={props.eventHandler}/>
			</form>
		</div>
	)
}

export default SearchForm