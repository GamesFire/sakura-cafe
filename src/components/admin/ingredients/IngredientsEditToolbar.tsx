import type { FC } from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface IngredientsEditToolbarProps {
  handleAddIngredient: () => void;
  isEditing: boolean;
}

const IngredientsEditToolbar: FC<IngredientsEditToolbarProps> = (props) => {
  const { handleAddIngredient, isEditing } = props;

  return (
    <GridToolbarContainer>
      <Button
        className="btn"
        sx={{ marginBlock: 1 }}
        startIcon={<AddIcon />}
        onClick={handleAddIngredient}
        disabled={isEditing}
      >
        Додати новий інгредієнт
      </Button>
    </GridToolbarContainer>
  );
};

export default IngredientsEditToolbar;
