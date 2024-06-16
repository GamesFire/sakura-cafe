import type { FC } from "react";
import { Button } from "@mui/material";

interface AdminButtonCellProps {
  selectedUserId: number | null;
  params: any;
  handleAddAdminClick: () => void;
}

const AdminButtonCell: FC<AdminButtonCellProps> = ({
  selectedUserId,
  params,
  handleAddAdminClick,
}) => {
  if (selectedUserId === params.id) {
    return (
      <Button
        className="btn"
        onClick={handleAddAdminClick}
        sx={{
          fontSize: "0.75rem",
        }}
      >
        Зробити адміністратором
      </Button>
    );
  }
  return null;
};

export default AdminButtonCell;
