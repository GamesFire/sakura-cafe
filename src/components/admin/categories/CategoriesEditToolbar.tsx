import type { FC } from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface CategoriesEditToolbarProps {
  handleAddCategory: () => void;
  isEditing: boolean;
}

const CategoriesEditToolbar: FC<CategoriesEditToolbarProps> = ({
  handleAddCategory,
  isEditing,
}) => {
  return (
    <GridToolbarContainer>
      <Button
        className="btn"
        sx={{ marginBlock: 1 }}
        startIcon={<AddIcon />}
        onClick={handleAddCategory}
        disabled={isEditing}
      >
        Додати нову категорію
      </Button>
    </GridToolbarContainer>
  );
};

export default CategoriesEditToolbar;
