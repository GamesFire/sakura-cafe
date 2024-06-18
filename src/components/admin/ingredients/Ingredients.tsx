import type { FC } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridSlots } from "@mui/x-data-grid";
import { CircularProgress, Typography } from "@mui/material";
import { useIngredientsHandlers } from "./useIngredientsHandlers";
import IngredientsEditToolbar from "./IngredientsEditToolbar";
import getIngredientsActions from "./getIngredientsActions";
import IngredientsImageCellRenderer from "./IngredientsImageCellRenderer";
import ErrorAlert from "../ErrorAlert";

const Ingredients: FC = () => {
  const {
    rows,
    rowModesModel,
    isLoading,
    error,
    apiRef,
    isEditing,
    handleAddIngredient,
    handleIngredientsImageUpload,
    handleIngredientsRowEditStop,
    handleIngredientsEditClick,
    handleIngredientsSaveClick,
    handleIngredientsDeleteClick,
    handleIngredientsCancelClick,
    processIngredientsRowUpdate,
    handleIngredientsRowModesModelChange,
    NotificationComponent,
  } = useIngredientsHandlers();

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Назва",
      flex: 1,
      editable: true,
      resizable: false,
    },
    {
      field: "image",
      headerName: "Зображення",
      width: 400,
      editable: false,
      resizable: false,
      hideable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IngredientsImageCellRenderer
          {...params}
          rowModesModel={rowModesModel}
          handleIngredientsImageUpload={handleIngredientsImageUpload}
        />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Дії",
      width: 200,
      resizable: false,
      hideable: false,
      sortable: false,
      disableColumnMenu: true,
      getActions: getIngredientsActions(
        rowModesModel,
        isEditing,
        handleIngredientsSaveClick,
        handleIngredientsCancelClick,
        handleIngredientsEditClick,
        handleIngredientsDeleteClick
      ),
    },
  ];

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-full">
        <CircularProgress size={100} sx={{ color: "#77374F" }} />
      </Box>
    );
  }

  if (error) {
    return <ErrorAlert />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBlock: { sm: 2, xxl: 6 } }}
      >
        Список інгредієнтов
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        getRowHeight={() => "auto"}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleIngredientsRowModesModelChange}
        onRowEditStop={handleIngredientsRowEditStop}
        processRowUpdate={processIngredientsRowUpdate}
        apiRef={apiRef}
        autoHeight
        slots={{
          toolbar: IngredientsEditToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { handleAddIngredient, isEditing },
        }}
      />
      {NotificationComponent}
    </Box>
  );
};

export default Ingredients;
