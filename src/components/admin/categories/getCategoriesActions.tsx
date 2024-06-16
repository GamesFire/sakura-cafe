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
  handleCategoriesSaveClick: (id: GridRowId) => () => void,
  handleCategoriesCancelClick: (id: GridRowId) => () => void,
  handleCategoriesEditClick: (id: GridRowId) => () => void,
  handleCategoriesDeleteClick: (id: GridRowId) => () => void
) => ({ id }: { id: GridRowId }) => JSX.Element[];

const getCategoriesActions: GetCategoriesActions =
  (
    rowModesModel,
    isEditing,
    handleCategoriesSaveClick,
    handleCategoriesCancelClick,
    handleCategoriesEditClick,
    handleCategoriesDeleteClick
  ) =>
  ({ id }: any) => {
    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

    if (isInEditMode) {
      return [
        <GridActionsCellItem
          icon={<SaveIcon sx={{ color: "#F4929F" }} />}
          label="Save"
          onClick={handleCategoriesSaveClick(id)}
        />,
        <GridActionsCellItem
          icon={<CancelIcon />}
          label="Cancel"
          className="textPrimary"
          onClick={handleCategoriesCancelClick(id)}
          color="inherit"
        />,
      ];
    }

    return [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={handleCategoriesEditClick(id)}
        color="inherit"
        disabled={isEditing}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={handleCategoriesDeleteClick(id)}
        color="inherit"
        disabled={isEditing}
      />,
    ];
  };

export default getCategoriesActions;
