import type { FC } from "react";
import { IFeedback } from "@/store/models/IFeedback";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface FeedbackDetailDialogProps {
  feedback: IFeedback;
  open: boolean;
  onClose: () => void;
}

const FeedbackDetailDialog: FC<FeedbackDetailDialogProps> = ({
  feedback,
  open,
  onClose,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    sx={{
      "& .MuiPaper-root": {
        backgroundColor: "#FFFFFF",
      },
    }}
  >
    <DialogTitle>Детальна інформація про зворотний зв'язок</DialogTitle>
    <DialogContent>
      <Typography variant="body1" textAlign="justify" marginBottom={2}>
        <strong>Тема:</strong>
        <p style={{ whiteSpace: "pre-line" }}>{feedback.subject}</p>
      </Typography>
      <Typography variant="body1" textAlign="justify">
        <strong>Повідомлення:</strong>
        <p style={{ whiteSpace: "pre-line" }}>{feedback.message}</p>
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button className="btn" onClick={onClose}>
        Закрити
      </Button>
    </DialogActions>
  </Dialog>
);

export default FeedbackDetailDialog;
