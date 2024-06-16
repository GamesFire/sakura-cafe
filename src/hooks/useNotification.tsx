import { useState } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface UseNotificationReturn {
  notificationOpen: boolean;
  notificationMessage: string;
  notificationSeverity: AlertProps["severity"];
  showNotification: (
    message: string,
    severity?: AlertProps["severity"]
  ) => void;
  handleCloseNotification: () => void;
  NotificationComponent: JSX.Element;
}

const useNotification = (): UseNotificationReturn => {
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationSeverity, setNotificationSeverity] =
    useState<AlertProps["severity"]>("warning");

  const handleCloseNotification = () => {
    setNotificationOpen(false);
  };

  const showNotification = (
    message: string,
    severity: AlertProps["severity"] = "warning"
  ) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setNotificationOpen(true);
  };

  const NotificationComponent = (
    <Snackbar
      open={notificationOpen}
      autoHideDuration={6000}
      onClose={handleCloseNotification}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleCloseNotification}
        severity={notificationSeverity}
      >
        {notificationMessage}
      </MuiAlert>
    </Snackbar>
  );

  return {
    notificationOpen,
    notificationMessage,
    notificationSeverity,
    showNotification,
    handleCloseNotification,
    NotificationComponent,
  };
};

export default useNotification;
