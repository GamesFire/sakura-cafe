import type { FC } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridSlots } from "@mui/x-data-grid";
import { useAppSelector } from "@/hooks/redux";
import { CircularProgress, Typography } from "@mui/material";
import type { IIngredient } from "@/store/models/IIngredient";
import type { RootState } from "@/store/store";
import { useFoodsHandlers } from "./useFoodsHandlers";
import CategorySelectEditCell from "./CategorySelectEditCell";
import IngredientsSelectEditCell from "./IngredientsSelectEditCell";
import FoodsEditToolbar from "./FoodsEditToolbar";
import getFoodsActions from "./getFoodsActions";
import FoodsImageCellRenderer from "./FoodsImageCellRenderer";
import ErrorAlert from "../ErrorAlert";

const Foods: FC = () => {
  const { categories } = useAppSelector(
    (state: RootState) => state.categorySlice
  );
  const { ingredients } = useAppSelector(
    (state: RootState) => state.ingredientSlice
  );
  const {
    rows,
    rowModesModel,
    isFoodsLoading,
    isCategoriesLoading,
    isIngredientsLoading,
    errorFoods,
    errorCategories,
    errorIngredients,
    apiRef,
    isEditing,
    handleAddFood,
    handleFoodsImageUpload,
    handleFoodsRowEditStop,
    handleFoodsEditClick,
    handleFoodsSaveClick,
    handleFoodsDeleteClick,
    handleFoodsCancelClick,
    processFoodsRowUpdate,
    handleFoodsRowModesModelChange,
    NotificationComponent,
  } = useFoodsHandlers();

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Назва",
      width: 160,
      editable: true,
      resizable: false,
    },
    {
      field: "price",
      headerName: "Ціна",
      width: 100,
      editable: true,
      resizable: false,
    },
    {
      field: "rating",
      headerName: "Рейтинг",
      width: 100,
      editable: true,
      resizable: false,
    },
    {
      field: "image",
      headerName: "Зображення",
      width: 200,
      editable: false,
      resizable: false,
      hideable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <FoodsImageCellRenderer
          {...params}
          rowModesModel={rowModesModel}
          handleFoodsImageUpload={handleFoodsImageUpload}
        />
      ),
    },
    {
      field: "category",
      headerName: "Категорія",
      width: 160,
      editable: true,
      resizable: false,
      valueGetter: (_value, row) => row.category?.name || "",
      renderEditCell: (params) => (
        <CategorySelectEditCell {...params} categories={categories} />
      ),
    },
    {
      field: "ingredients",
      headerName: "Інгредієнти",
      width: 400,
      editable: true,
      resizable: false,
      valueGetter: (_value, row) => {
        if (Array.isArray(row.ingredients)) {
          return row.ingredients
            .map((ingredient: IIngredient) => ingredient.title)
            .join(", ");
        }
        return "";
      },
      renderEditCell: (params) => (
        <IngredientsSelectEditCell {...params} ingredients={ingredients} />
      ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Дії",
      width: 100,
      resizable: false,
      hideable: false,
      sortable: false,
      disableColumnMenu: true,
      getActions: getFoodsActions(
        rowModesModel,
        isEditing,
        handleFoodsSaveClick,
        handleFoodsCancelClick,
        handleFoodsEditClick,
        handleFoodsDeleteClick
      ),
    },
  ];

  if (isFoodsLoading || isCategoriesLoading || isIngredientsLoading) {
    return (
      <Box className="flex justify-center items-center h-full">
        <CircularProgress size={100} sx={{ color: "#77374F" }} />
      </Box>
    );
  }

  if (errorFoods || errorCategories || errorIngredients) {
    return <ErrorAlert />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBlock: { sm: 2, xxl: 6 } }}
      >
        Список їжі
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        getRowHeight={() => "auto"}
        rowModesModel={rowModesModel}
        onRowEditStop={handleFoodsRowEditStop}
        processRowUpdate={processFoodsRowUpdate}
        onRowModesModelChange={handleFoodsRowModesModelChange}
        autoHeight
        apiRef={apiRef}
        slots={{
          toolbar: FoodsEditToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { handleAddFood, isEditing },
        }}
      />
      {NotificationComponent}
    </Box>
  );
};

export default Foods;
