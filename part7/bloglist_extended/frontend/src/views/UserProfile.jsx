import { useParams } from "react-router-dom";

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
        <div>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </div>
      </div>
    );
  }
};

export default UserProfile;
