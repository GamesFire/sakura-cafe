import type { FC } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridSlots } from "@mui/x-data-grid";
import { CircularProgress, Typography } from "@mui/material";
import { useCategoriesHandlers } from "./useCategoriesHandlers";
import CategoriesEditToolbar from "./CategoriesEditToolbar";
import ErrorAlert from "../ErrorAlert";
import getCategoriesActions from "./getCategoriesActions";

const Categories: FC = () => {
  const {
    rows,
    rowModesModel,
    isLoading,
    error,
    apiRef,
    isEditing,
    handleAddCategory,
    handleCategoriesRowEditStop,
    handleCategoriesEditClick,
    handleCategoriesSaveClick,
    handleCategoriesDeleteClick,
    handleCategoriesCancelClick,
    processCategoriesRowUpdate,
    handleCategoriesRowModesModelChange,
  } = useCategoriesHandlers();

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Назва",
      flex: 1,
      editable: true,
      resizable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Дії",
      resizable: false,
      hideable: false,
      sortable: false,
      disableColumnMenu: true,
      width: 100,
      cellClassName: "actions",
      getActions: getCategoriesActions(
        rowModesModel,
        isEditing,
        handleCategoriesSaveClick,
        handleCategoriesCancelClick,
        handleCategoriesEditClick,
        handleCategoriesDeleteClick
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
      <Typography variant="h4" align="center" marginBlock={2}>
        Список категорій
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStop={handleCategoriesRowEditStop}
        processRowUpdate={processCategoriesRowUpdate}
        onRowModesModelChange={handleCategoriesRowModesModelChange}
        apiRef={apiRef}
        slots={{
          toolbar: CategoriesEditToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { handleAddCategory, isEditing },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
      />
    </Box>
  );
};

export default Categories;
