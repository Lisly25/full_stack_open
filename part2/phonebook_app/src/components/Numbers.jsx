const Numbers = (props) => {

	const Person = ({ person }) => {
		return <div>{person.name} {person.number}</div>;
	  };
	

	return (
		<ul>
        {props.filteredContacts.map((person) => (
          <li key={person.name}>
            <Person person={person}/>
          </li>
        ))}
      	</ul>
	)
}

export default Numbers;