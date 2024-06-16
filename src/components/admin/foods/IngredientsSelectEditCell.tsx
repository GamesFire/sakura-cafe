import { useCallback, useMemo, type FC } from "react";
import {
  useGridApiContext,
  type GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { IIngredient } from "@/store/models/IIngredient";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

interface IngredientsSelectEditCellProps extends GridRenderEditCellParams {
  ingredients: IIngredient[];
}

const IngredientsSelectEditCell: FC<IngredientsSelectEditCellProps> = (
  props
) => {
  const { id, value, field, ingredients } = props;
  const apiRef = useGridApiContext();

  const selectedIngredientIds = useMemo(() => {
    if (typeof value === "string") {
      const ingredientsFromState = ingredients.filter((ingredient) =>
        value.split(", ").includes(ingredient.title)
      );
      return ingredientsFromState.map((ingredient) => ingredient.id);
    } else {
      return value as number[];
    }
  }, [value, ingredients]);

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const ingredientId = Number(event.target.value);
      let newSelectedIds = [...selectedIngredientIds];
      if (checked) {
        newSelectedIds.push(ingredientId);
      } else {
        newSelectedIds = newSelectedIds.filter((id) => id !== ingredientId);
      }

      await apiRef.current.setEditCellValue({
        id,
        field,
        value: newSelectedIds,
      });
      apiRef.current.stopCellEditMode({ id, field });
    },
    [apiRef, id, field, selectedIngredientIds]
  );

  return (
    <FormGroup
      className="w-full h-[120px]"
      sx={{ flexWrap: "nowrap", overflowY: "auto" }}
    >
      {ingredients.map((ingredient) => (
        <FormControlLabel
          key={ingredient.id}
          control={
            <Checkbox
              checked={selectedIngredientIds.includes(ingredient.id)}
              onChange={(event, checked) => handleChange(event, checked)}
              value={ingredient.id}
            />
          }
          label={ingredient.title}
        />
      ))}
    </FormGroup>
  );
};

export default IngredientsSelectEditCell;
