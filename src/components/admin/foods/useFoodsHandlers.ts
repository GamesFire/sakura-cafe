import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useHandleApiError } from "@/hooks/useHandleApiError";
import useNotification from "@/hooks/useNotification";
import { useGetCategoriesQuery } from "@/services/category";
import {
  useCreateFoodMutation,
  useDeleteFoodMutation,
  useGetFoodsQuery,
  useUpdateFoodMutation,
} from "@/services/food";
import { useGetIngredientsQuery } from "@/services/ingredient";
import { IFood } from "@/store/models/IFood";
import { setCategories } from "@/store/slices/categorySlice";
import {
  addFood,
  removeFood,
  setFoods,
  updateCurrentFood,
} from "@/store/slices/foodSlice";
import { setIngredients } from "@/store/slices/ingredientSlice";
import type { RootState } from "@/store/store";
import {
  GridRowModes,
  useGridApiRef,
  type GridEventListener,
  type GridRowEditStopReasons,
  type GridRowId,
  type GridRowModel,
  type GridRowModesModel,
} from "@mui/x-data-grid";
import { useCallback, useEffect, useRef, useState } from "react";

export const useFoodsHandlers = () => {
  const { categories } = useAppSelector(
    (state: RootState) => state.categorySlice
  );
  const { ingredients } = useAppSelector(
    (state: RootState) => state.ingredientSlice
  );
  const dispatch = useAppDispatch();
  const {
    data: foods,
    isLoading: isFoodsLoading,
    error: errorFoods,
  } = useGetFoodsQuery();
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    error: errorCategories,
  } = useGetCategoriesQuery();
  const {
    data: ingredientsData,
    isLoading: isIngredientsLoading,
    error: errorIngredients,
  } = useGetIngredientsQuery();
  const [createFood] = useCreateFoodMutation();
  const [updateFood] = useUpdateFoodMutation();
  const [deleteFood] = useDeleteFoodMutation();
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState<IFood[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editingRowId = useRef<GridRowId | null>(null);
  const { showNotification, NotificationComponent } = useNotification();
  const handleApiError = useHandleApiError();

  useEffect(() => {
    if (foods && categoriesData && ingredientsData) {
      dispatch(setFoods(foods));
      dispatch(setCategories(categoriesData));
      dispatch(setIngredients(ingredientsData));
      setRows(foods);
    }
  }, [foods, categoriesData, ingredientsData, dispatch]);

  const handleAddFood = () => {
    const id = Math.random();
    const newRow = {
      id,
      name: "",
      price: 0,
      rating: 0,
      image: "",
      category: { id: 0, name: "" },
      ingredients: [],
    };
    setRows((oldRows) => [...oldRows, newRow]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
    setIsEditing(true);
    editingRowId.current = id;

    apiRef.current.setPage(Math.ceil(rows.length / 10));
    apiRef.current.setCellFocus(id, "name");
  };

  const handleFoodsRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (
      params.reason &&
      params.reason === ("rowEditStop" as GridRowEditStopReasons)
    ) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleFoodsEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setIsEditing(true);
    editingRowId.current = id;
  };

  const handleFoodsSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setIsEditing(false);
    editingRowId.current = null;
  };

  const handleFoodsDeleteClick = (id: GridRowId) => async () => {
    try {
      await deleteFood(id as number).unwrap();
      showNotification("Страву успішно видалено", "success");
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      dispatch(removeFood(id as number));
    } catch (error: any) {
      const errorMessage = handleApiError(error);
      showNotification(errorMessage, "error");
    }
  };

  const handleFoodsCancelClick = useCallback(
    (id: GridRowId) => () => {
      const isNewRow = !Number.isInteger(id);
      if (isNewRow) {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      } else {
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
      }
      setIsEditing(false);
      editingRowId.current = null;
    },
    [setRows, setRowModesModel, rowModesModel]
  );

  useEffect(() => {
    const handleFoodsClickOutside = (event: MouseEvent) => {
      if (isEditing && editingRowId.current !== null) {
        const path = event.composedPath();
        const isClickInside = path.some(
          (element) =>
            (element as HTMLElement).dataset?.id ===
            String(editingRowId.current)
        );
        if (!isClickInside) {
          handleFoodsCancelClick(editingRowId.current)();
        }
      }
    };

    document.addEventListener("mousedown", handleFoodsClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleFoodsClickOutside);
    };
  }, [isEditing, handleFoodsCancelClick]);

  const handleFoodsImageUpload =
    (rowId: GridRowId) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === rowId ? { ...row, image: file } : row
          )
        );
      }
    };

  const processFoodsRowUpdate = async (newRow: GridRowModel) => {
    const originalRow = rows.find((row) => row.id === newRow.id);

    const categoryFromState = categories.find(
      (category) => category.name === newRow.category
    );
    const categoryId = categoryFromState ? categoryFromState.id : -1;

    let ingredientIds: number[] | null = null;

    if (!Array.isArray(newRow.ingredients)) {
      const ingredientTitles = newRow.ingredients
        .split(", ")
        .map((title: string) => title.trim());

      ingredientIds = ingredientTitles
        .map((ingredientTitle: string) => {
          const ingredient = ingredients.find(
            (ing) => ing.title === ingredientTitle
          );
          return ingredient ? ingredient.id : null;
        })
        .filter((id: any): id is number => id !== null);
    }

    if (Number.isInteger(newRow.id)) {
      try {
        const result = await updateFood({
          id: newRow.id as number,
          newName: newRow.name,
          newPrice: newRow.price,
          newRating: newRow.rating,
          newImage: newRow.image instanceof File ? newRow.image : undefined,
          newCategoryId: categoryId,
          newIngredientsIds: !ingredientIds
            ? newRow.ingredients
            : ingredientIds,
        }).unwrap();

        if (result) {
          showNotification("Страву успішно оновлено", "success");
          dispatch(updateCurrentFood(result));
          setRows((prevRows) =>
            prevRows.map((row) => (row.id === newRow.id ? result : row))
          );
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error);
        showNotification(errorMessage, "error");

        if (originalRow) {
          setRows((prevRows) =>
            prevRows.map((row) => (row.id === newRow.id ? originalRow : row))
          );
        }
      }
    } else {
      try {
        const result = await createFood({
          name: newRow.name,
          price: newRow.price,
          rating: newRow.rating,
          categoryId: categoryId,
          image: newRow.image instanceof File ? newRow.image : undefined,
          ingredientsIds: !ingredientIds ? newRow.ingredients : ingredientIds,
        }).unwrap();

        if (result) {
          showNotification("Страву успішно створено", "success");
          dispatch(addFood(result));
          setRows((prevRows) =>
            prevRows.map((row) => (row.id === newRow.id ? result : row))
          );
        }
      } catch (error: any) {
        const errorMessage = handleApiError(error);
        showNotification(errorMessage, "error");
        setRows((prevRows) => prevRows.filter((row) => row.id !== newRow.id));
      }
    }

    return newRow;
  };

  const handleFoodsRowModesModelChange = (
    newRowModesModel: GridRowModesModel
  ) => {
    setRowModesModel(newRowModesModel);
  };

  return {
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
  };
};
