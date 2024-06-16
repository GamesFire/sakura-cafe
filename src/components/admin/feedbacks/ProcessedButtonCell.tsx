import type { FC } from "react";
import { Button } from "@mui/material";

interface ProcessedFeedbackButtonCellProps {
  selectedFeedbackId: number | null;
  params: any;
  handleProcessedFeedbackClick: () => void;
}

const ProcessedFeedbackButtonCell: FC<ProcessedFeedbackButtonCellProps> = ({
  selectedFeedbackId,
  params,
  handleProcessedFeedbackClick,
}) => {
  if (selectedFeedbackId === params.id) {
    return (
      <Button
        className="btn"
        onClick={handleProcessedFeedbackClick}
        sx={{
          fontSize: "0.75rem",
        }}
      >
        Відмітити, як оброблений
      </Button>
    );
  }
  return null;
};

export default ProcessedFeedbackButtonCell;
