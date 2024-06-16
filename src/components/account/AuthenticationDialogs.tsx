import { useState, type FC } from "react";
import type { ErrorResponse } from "react-router-dom";
import { Dialog, DialogTitle } from "@mui/material";
import LoginForm from "../forms/LoginForm";
import RegistrationForm from "../forms/RegistrationForm";

interface AuthenticationDialogsProps {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}

const AuthenticationDialogs: FC<AuthenticationDialogsProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessages([]);
  };

  const handleClose = () => {
    setErrorMessages([]);
    setOpenDialog(false);
    setIsLogin(true);
  };

  const handleErrors = (error: any) => {
    if (error.status && error.data) {
      const errorResponse: ErrorResponse = error;
      if (errorResponse.status === 400 && Array.isArray(errorResponse.data)) {
        const formattedErrors = errorResponse.data.map(
          (errorMessage: string) => {
            const errorMessageParts = errorMessage.split(" - ");
            return errorMessageParts.length > 1
              ? errorMessageParts[1]
              : errorMessageParts[0];
          }
        );
        setErrorMessages(formattedErrors);
      } else {
        setErrorMessages([errorResponse.data.message]);
      }
    } else {
      console.error("Непередбачена помилка:", error);
      setErrorMessages(["Непередбачена помилка"]);
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      TransitionProps={{ timeout: 0 }}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <DialogTitle align="center">
        {isLogin ? "Вхід" : "Реєстрація"}
      </DialogTitle>
      {isLogin ? (
        <LoginForm
          onToggleForm={handleToggleForm}
          onClose={handleClose}
          onErrors={handleErrors}
          errorMessages={errorMessages}
          setErrorMessages={setErrorMessages}
        />
      ) : (
        <RegistrationForm
          onToggleForm={handleToggleForm}
          onClose={handleClose}
          onErrors={handleErrors}
          errorMessages={errorMessages}
          setErrorMessages={setErrorMessages}
        />
      )}
    </Dialog>
  );
};

export default AuthenticationDialogs;
