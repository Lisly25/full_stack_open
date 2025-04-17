import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return `a new blog ${action.payload.title} by ${action.payload.author} added`;
    case "CREATE_FAIL":
      return "Blog creation failed";
    case "LIKE_FAILED":
      return "Failed to like blog post";
    case "DELETE":
      return "Removed blog";
    case "DELETE_FAIL":
      return "Failed to remove blog";
    case "LOGIN":
      return "You logged in successfully";
    case "LOGIN_FAIL":
      return "Wrong credentials";
    case "NULL":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

// export const showNotificationForTime = (dispatchFunction, time) => {
//   dispatchFunction();
//   setTimeout(() => {
//     useNotificationDispatch("NULL");
//   }, time);
// };

export default NotificationContext;
