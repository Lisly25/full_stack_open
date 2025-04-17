import { useNotificationValue } from "../contexts/NotificationContext";

const Notification = () => {
  const notificationStyle = {
    background: "lightgrey",
    fontSize: 25,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const message = useNotificationValue();

  if (message === null) {
    return null;
  }

  return (
    <div style={notificationStyle} data-testid="error-message">
      {message}
    </div>
  );
};

export default Notification;
