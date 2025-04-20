import { useNotificationValue } from "../contexts/NotificationContext";

//Styles

import { Alert } from "@mui/material";

const Notification = () => {
  const message = useNotificationValue();

  if (message === null) {
    return null;
  }

  return <Alert data-testid="error-message">{message}</Alert>;
};

export default Notification;
