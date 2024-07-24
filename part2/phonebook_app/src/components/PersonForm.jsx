const PersonForm = (props) => {

	return (
		<div>
      	<form onSubmit={props.addNew}>
        <div>
        	name: <input value={props.name} onChange={props.newNameEventHandler} />
        </div>
        <div>
        	number: <input value={props.phoneNumber} onChange={props.newPhoneNumberEventHandler}/>
        </div>
        <div>
        	<button type="submit">add</button>
        </div>
      	</form>
		</div>
	)
}

export default PersonForm;