import { useAppDispatch } from "@/hooks/redux";
import { useHandleApiError } from "@/hooks/useHandleApiError";
import useNotification from "@/hooks/useNotification";
import {
  useCreateIngredientMutation,
  useDeleteIngredientMutation,
  useGetIngredientsQuery,
  useUpdateIngredientMutation,
} from "@/services/ingredient";
import type { IIngredient } from "@/store/models/IIngredient";
import {
  addIngredient,
  removeIngredient,
  setIngredients,
  updateCurrentIngredient,
} from "@/store/slices/ingredientSlice";
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

export const useIngredientsHandlers = () => {
  const dispatch = useAppDispatch();
  const { data: ingredients, isLoading, error } = useGetIngredientsQuery();
  const [createIngredient] = useCreateIngredientMutation();
  const [updateIngredient] = useUpdateIngredientMutation();
  const [deleteIngredient] = useDeleteIngredientMutation();
  const apiRef = useGridApiRef();

  const [rows, setRows] = useState<IIngredient[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const editingRowId = useRef<GridRowId | null>(null);
  const { showNotification, NotificationComponent } = useNotification();
  const handleApiError = useHandleApiError();

  useEffect(() => {
    if (ingredients) {
      dispatch(setIngredients(ingredients));
      setRows(ingredients);
    }
  }, [dispatch, ingredients]);

  const handleAddIngredient = () => {
    const id = Math.random();
    const newRow = {
      id,
      title: "",
      image: "",
    };
    setRows((oldRows) => [...oldRows, newRow]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "title" },
    }));
    setIsEditing(true);
    editingRowId.current = id;

    apiRef.current.setPage(Math.ceil(rows.length / 10));
    apiRef.current.setCellFocus(id, "title");
  };

  const handleIngredientsImageUpload =
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

  const handleIngredientsRowEditStop: GridEventListener<"rowEditStop"> = (
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

  const handleIngredientsEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    setIsEditing(true);
    editingRowId.current = id;
  };

  const handleIngredientsSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setIsEditing(false);
    editingRowId.current = null;
  };

  const handleIngredientsDeleteClick = (id: GridRowId) => async () => {
    try {
      await deleteIngredient(id as number).unwrap();
      showNotification("Інгредієнт успішно видалено", "success");
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      dispatch(removeIngredient(id as number));
    } catch (error: any) {
      const errorMessage = handleApiError(error);
      showNotification(errorMessage, "error");
    }
  };

  const handleIngredientsCancelClick = useCallback(
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
    const handleIngredientsClickOutside = (event: MouseEvent) => {
      if (isEditing && editingRowId.current !== null) {
        const path = event.composedPath();
        const isClickInside = path.some(
          (element) =>
            (element as HTMLElement).dataset?.id ===
            String(editingRowId.current)
        );
        if (!isClickInside) {
          handleIngredientsCancelClick(editingRowId.current)();
        }
      }
    };

    document.addEventListener("mousedown", handleIngredientsClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleIngredientsClickOutside);
    };
  }, [isEditing, handleIngredientsCancelClick]);

  const processIngredientsRowUpdate = async (newRow: GridRowModel) => {
    const originalRow = rows.find((row) => row.id === newRow.id);

    if (Number.isInteger(newRow.id)) {
      try {
        const result = await updateIngredient({
          id: newRow.id as number,
          newTitle: newRow.title,
          newImage: newRow.image instanceof File ? newRow.image : undefined,
        }).unwrap();

        if (result) {
          showNotification("Інгредієнт успішно оновлено", "success");
          dispatch(updateCurrentIngredient(result));
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
        const result = await createIngredient({
          title: newRow.title,
          image: newRow.image instanceof File ? newRow.image : undefined,
        }).unwrap();

        if (result) {
          showNotification("Інгредієнт успішно створено", "success");
          dispatch(addIngredient(result));
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

  const handleIngredientsRowModesModelChange = (
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
  };
};
