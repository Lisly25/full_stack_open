import { Link } from "react-router-dom";

const UserRow = ({ user }) => {
  return (
    <tr key={user.id}>
      <td>
        <Link to={`/users/${user.id}`}>{user.username}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

const UsersView = ({ users }) => {
  if (users.isLoading) {
    return <div>Loading users data...</div>;
  } else {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.data.map((user) => {
              return <UserRow key={user.id} user={user} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default UsersView;
