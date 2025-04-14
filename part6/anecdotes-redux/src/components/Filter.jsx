import { useDispatch } from "react-redux";
import { filterReducer } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch()

  const changeFilter = (event) => {
    event.preventDefault()
    dispatch(filterReducer(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <form>
        filter <input name="filter-field" type="text" onChange={changeFilter}/>
      </form>
    </div>
  )
}

export default Filter