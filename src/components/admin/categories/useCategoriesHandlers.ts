import { useEffect, useState, useRef, useCallback } from "react";
import {
  useGridApiRef,
  type GridEventListener,
  type GridRowId,
  type GridRowModel,
  type GridRowModesModel,
} from "@mui/x-data-grid";
import { useAppDispatch } from "@/hooks/redux";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/services/category";
import {
  addCategory,
  removeCategory,
  setCategories,
  updateCurrentCategory,
} from "@/store/slices/categorySlice";
import { GridRowEditStopReasons, GridRowModes } from "@mui/x-data-grid";
import { ICategory } from "@/store/models/ICategory";
import useNotification from "@/hooks/useNotification";
import { useHandleApiError } from "@/hooks/useHandleApiError";

export const useCategoriesHandlers = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState<ICategory[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editingRowId = useRef<GridRowId | null>(null);
  const { showNotification, NotificationComponent } = useNotification();
  const handleApiError = useHandleApiError();

  useEffect(() => {
    if (data) {
      dispatch(setCategories(data));
      setRows(data);
    }
  }, [data, dispatch]);

  const handleAddCategory = () => {
    const id = Math.random();
    const newRow = { id, name: "" };

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

  const handleCategoriesRowEditStop: GridEventListener<"rowEditStop"> = (
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

  const handleCategoriesEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setIsEditing(true);
    editingRowId.current = id;
  };

  const handleCategoriesSaveClick = (id: GridRowId) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setIsEditing(false);
    editingRowId.current = null;
  };

  const handleCategoriesDeleteClick = (id: GridRowId) => async () => {
    try {
      await deleteCategory(id as number).unwrap();
      showNotification("Категорію успішно видалено", "success");
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      dispatch(removeCategory(id as number));
    } catch (error: any) {
      const errorMessage = handleApiError(error);
      showNotification(errorMessage, "error");
    }
  };

  const handleCategoriesCancelClick = useCallback(
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
    const handleCategoriesClickOutside = (event: MouseEvent) => {
      if (isEditing && editingRowId.current !== null) {
        const path = event.composedPath();
        const isClickInside = path.some(
          (element) =>
            (element as HTMLElement).dataset?.id ===
            String(editingRowId.current)
        );
        if (!isClickInside) {
          handleCategoriesCancelClick(editingRowId.current)();
        }
      }
    };

    document.addEventListener("mousedown", handleCategoriesClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleCategoriesClickOutside);
    };
  }, [isEditing, handleCategoriesCancelClick]);

  const processCategoriesRowUpdate = async (newRow: GridRowModel) => {
    const originalRow = rows.find((row) => row.id === newRow.id);

    if (Number.isInteger(newRow.id)) {
      try {
        const result = await updateCategory({
          id: newRow.id as number,
          newName: newRow.name,
        }).unwrap();
        if (result) {
          showNotification("Категорію успішно оновлено", "success");
          dispatch(updateCurrentCategory(result));
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
        const result = await createCategory({ name: newRow.name }).unwrap();
        if (result) {
          showNotification("Категорію успішно створено", "success");
          dispatch(addCategory(result));
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

  const handleCategoriesRowModesModelChange = (
    newRowModesModel: GridRowModesModel
  ) => {
    setRowModesModel(newRowModesModel);
  };

  return {
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
    NotificationComponent,
  };
};
