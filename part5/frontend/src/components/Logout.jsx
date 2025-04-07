const Logout = ({setUser}) => {
    const deleteToken = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    return (
        <button onClick={deleteToken}>Log out</button>
    )
}

export default Logout