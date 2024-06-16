import type { FC } from "react";
import { IUser } from "@/store/models/IUser";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface UserDetailProps {
  user: IUser;
  open: boolean;
  onClose: () => void;
}

const UserDetailDialog: FC<UserDetailProps> = ({ user, open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    sx={{
      "& .MuiPaper-root": {
        backgroundColor: "#FFFFFF",
      },
    }}
  >
    <DialogTitle>Детальна інформація про користувача</DialogTitle>
    <DialogContent>
      <Typography variant="body1">
        <strong>Ім'я:</strong> {user.name}
      </Typography>
      <Typography variant="body1">
        <strong>E-mail:</strong> {user.email}
      </Typography>
      <Typography variant="body1">
        <strong>Роль:</strong> {user.role}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button className="btn" onClick={onClose}>
        Закрити
      </Button>
    </DialogActions>
  </Dialog>
);

export default UserDetailDialog;
