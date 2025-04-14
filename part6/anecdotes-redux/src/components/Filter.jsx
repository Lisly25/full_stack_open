import { useDispatch } from "react-redux";
import { filterActionCreator } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch()

  const changeFilter = (event) => {
    event.preventDefault()
    dispatch(filterActionCreator(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      <form>
        filter <input type="text" onChange={changeFilter}/>
      </form>
    </div>
  )
}

export default Filter