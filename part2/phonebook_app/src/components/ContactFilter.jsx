const ContactFilter = (props) => {
	return (
		<div>
        	filter shown with: <input value={props.filter} onChange={props.eventHandler}/>
      	</div>
	)
}

export default ContactFilter;