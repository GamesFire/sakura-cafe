import { GridActionsCellItem, type GridRowId } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { GridRowModes } from "@mui/x-data-grid";

interface RowModesModel {
  [key: GridRowId]: {
    mode: GridRowModes;
    fieldToFocus?: string;
  };
}

type GetCategoriesActions = (
  rowModesModel: RowModesModel,
  isEditing: boolean,
  handleFoodsSaveClick: (id: GridRowId) => () => void,
  handleFoodsCancelClick: (id: GridRowId) => () => void,
  handleFoodsEditClick: (id: GridRowId) => () => void,
  handleFoodsDeleteClick: (id: GridRowId) => () => void
) => ({ id }: { id: GridRowId }) => JSX.Element[];

const getFoodsActions: GetCategoriesActions =
  (
    rowModesModel,
    isEditing,
    handleFoodsSaveClick,
    handleFoodsCancelClick,
    handleFoodsEditClick,
    handleFoodsDeleteClick
  ) =>
  ({ id }: any) => {
    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

    if (isInEditMode) {
      return [
        <GridActionsCellItem
          key={1}
          icon={<SaveIcon sx={{ color: "#F4929F" }} />}
          label="Save"
          onClick={handleFoodsSaveClick(id)}
        />,
        <GridActionsCellItem
          key={2}
          icon={<CancelIcon />}
          label="Cancel"
          className="textPrimary"
          onClick={handleFoodsCancelClick(id)}
          color="inherit"
        />,
      ];
    }

    return [
      <GridActionsCellItem
        key={1}
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={handleFoodsEditClick(id)}
        color="inherit"
        disabled={isEditing}
      />,
      <GridActionsCellItem
        key={2}
        icon={<DeleteIcon />}
        label="Delete"
        onClick={handleFoodsDeleteClick(id)}
        color="inherit"
        disabled={isEditing}
      />,
    ];
  };

export default getFoodsActions;
