import { useEffect, useState, type FC } from "react";
import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store/store";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";

const ConfirmationWarningDialog: FC = () => {
  const { userInfo } = useAppSelector(
    (state: RootState) => state.authenticationSlice
  );
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userInfo && userInfo.role === "guest") {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <DialogTitle align="center" color="warning.main">
        <span className="font-bold">У Вас неактивований обліковий запис!</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText align="justify">
          На Вашу вказану при реєстрації електронну адресу було відправлено
          повідомлення з інструкцією для активації облікового запису. Будь
          ласка, перевірте свою відповідну електронну пошту, щоб підтвердити
          свій обліковий запис.
        </DialogContentText>
        <DialogActions sx={{ padding: 0, paddingTop: "1rem" }}>
          <Button className="btn" variant="contained" onClick={handleClose}>
            Закрити
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationWarningDialog;
