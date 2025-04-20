import { Link } from "react-router-dom";

//Styles
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  Button,
} from "@mui/material";

const UserRow = ({ user }) => {
  return (
    <TableRow key={user.id}>
      <TableCell>
        <Button component={Link} to={`/users/${user.id}`}>
          {user.username}
        </Button>
      </TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  );
};

const UsersView = ({ users }) => {
  if (users.isLoading) {
    return <div>Loading users data...</div>;
  } else {
    return (
      <div>
        <h2>Users</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>blogs created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.data.map((user) => {
                return <UserRow key={user.id} user={user} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
};

export default UsersView;
