import { useUserDispatch } from "../contexts/UserContext";

const Logout = () => {
  const dispatchUser = useUserDispatch();

  const deleteToken = () => {
    dispatchUser({ type: "LOGOUT" });
  };

  return <button onClick={deleteToken}>Log out</button>;
};

export default Logout;
