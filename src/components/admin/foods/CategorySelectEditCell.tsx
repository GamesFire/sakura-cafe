import { useCallback, type FC } from "react";
import { useGridApiContext, type GridRenderEditCellParams } from "@mui/x-data-grid";
import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";

interface CategorySelectEditCellProps extends GridRenderEditCellParams {
  categories: { id: number; name: string }[];
}

const CategorySelectEditCell: FC<CategorySelectEditCellProps> = (props) => {
  const { id, value, field, categories } = props;
  const apiRef = useGridApiContext();

  const handleChange = useCallback(
    async (event: SelectChangeEvent<any>) => {
      await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value as string,
      });
      apiRef.current.stopCellEditMode({ id, field });
    },
    [apiRef, id, field]
  );

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <div onMouseDown={handleMouseDown} className="flex w-full h-full">
      <Select value={value} onChange={handleChange} fullWidth>
        {categories.map((category) => (
          <MenuItem key={category.id} value={category.name}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default CategorySelectEditCell;
