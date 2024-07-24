const Numbers = (props) => {

	const Person = ({ person }) => {
		return <div>{person.name} {person.number}</div>;
	  };
	
	const DeletePerson = (props) => {
		console.log(`Person ${props.person.name} about to be deleted`)
		return (
			<button type="button" onClick={() => props.removeEventHandler(props.person)}>delete</button>
		)
	}

	return (
		<ul>
        {props.filteredContacts.map((person) => (
          <li key={person.name}>
            <Person person={person}/><DeletePerson  person={person} removeEventHandler={props.removeEventHandler}/>
          </li>
        ))}
      	</ul>
	)
}

export default Numbers;