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

export const useCategoriesHandlers = () => {
  const dispatch = useAppDispatch();
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState<ICategory[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editingRowId = useRef<GridRowId | null>(null);

  useEffect(() => {
    if (categories) {
      dispatch(setCategories(categories));
      setRows(categories);
    }
  }, [categories, dispatch]);

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
    await deleteCategory(id as number);
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    dispatch(removeCategory(id as number));
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
    if (Number.isInteger(newRow.id)) {
      const result = await updateCategory({
        id: newRow.id as number,
        newName: newRow.name,
      });

      if (result.data) {
        dispatch(updateCurrentCategory(result.data));
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === newRow.id ? result.data : row))
        );
      }
    } else {
      const result = await createCategory({ name: newRow.name });

      if (result.data) {
        dispatch(addCategory(result.data));
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === newRow.id ? result.data : row))
        );
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
  };
};
