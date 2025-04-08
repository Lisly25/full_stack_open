import PropTypes from 'prop-types'

const Logout = ({ setUser }) => {
  const deleteToken = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <button onClick={deleteToken}>Log out</button>
  )
}

Logout.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default Logout