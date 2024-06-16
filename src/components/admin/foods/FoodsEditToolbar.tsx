import type { FC } from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface FoodsEditToolbarProps {
  handleAddFood: () => void;
  isEditing: boolean;
}

const FoodsEditToolbar: FC<FoodsEditToolbarProps> = (props) => {
  const { handleAddFood, isEditing } = props;

  return (
    <GridToolbarContainer>
      <Button
        className="btn"
        sx={{ marginBlock: 1 }}
        startIcon={<AddIcon />}
        onClick={handleAddFood}
        disabled={isEditing}
      >
        Додати нову їжу
      </Button>
    </GridToolbarContainer>
  );
};

export default FoodsEditToolbar;
