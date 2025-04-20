import { useParams } from "react-router-dom";

//Styles

import { List, ListItem, ListItemText } from "@mui/material";

const UserProfile = ({ users }) => {
  const id = useParams().id;

  if (users.isLoading) {
    return <div>Loading user profile...</div>;
  } else {
    const userList = users.data;

    const user = userList.find((n) => n.id === id);

    return (
      <div>
        <h2>{user.username}</h2>
        <h3>added blogs</h3>
        <List>
          {user.blogs.map((blog) => (
            <ListItem divider={true} key={blog.id}>
              <ListItemText>{blog.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
};

export default UserProfile;
