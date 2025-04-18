import userService from "../services/users";
import { useEffect, useState } from "react";

const UserRow = ({ user }) => {
  return (
    <tr key={user.id}>
      <td>{user.username}</td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

const UsersView = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    userService.getUsers().then((receivedUsers) => setUsers(receivedUsers));
  }, []);

  if (users === null) {
    return <div>Loading users data...</div>;
  } else {
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <th></th>
            <th>blogs created</th>
          </thead>
          <tbody>
            {users.map((user) => {
              return <UserRow key={user.id} user={user} />;
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

export default UsersView;
