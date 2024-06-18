import { useAppDispatch } from "@/hooks/redux";
import { useHandleApiError } from "@/hooks/useHandleApiError";
import useNotification from "@/hooks/useNotification";
import {
  useGetFeedbacksQuery,
  useProcessedFeedbackMutation,
} from "@/services/feedback";
import { IFeedback } from "@/store/models/IFeedback";
import { IUser } from "@/store/models/IUser";
import { setFeedbacks } from "@/store/slices/feedbackSlice";
import type { GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export const useFeedbackHandlers = () => {
  const dispatch = useAppDispatch();
  const {
    data: feedbacksData,
    isLoading: isFeedbacksLoading,
    error: errorFeedbacks,
  } = useGetFeedbacksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [processedFeedback] = useProcessedFeedbackMutation();
  const [rows, setRows] = useState<IFeedback[]>([]);
  const [isUserDetailDialogOpen, setIsUserDetailDialogOpen] =
    useState<boolean>(false);
  const [isFeedbackDetailDialogOpen, setIsFeedbackDetailDialogOpen] =
    useState<boolean>(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<number | null>(
    null
  );
  const [selectedFeedback, setSelectedFeedback] = useState<IFeedback | null>(
    null
  );
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const { showNotification, NotificationComponent } = useNotification();
  const handleApiError = useHandleApiError();

  useEffect(() => {
    if (feedbacksData) {
      dispatch(setFeedbacks(feedbacksData));
      setRows(feedbacksData);
    }
  }, [feedbacksData, dispatch]);

  const handleFeedbacksCheckboxChange = (
    selectionModel: GridRowSelectionModel
  ) => {
    const selectedId =
      selectionModel.length > 0 ? Number(selectionModel[0]) : null;
    setSelectedFeedbackId(selectedId);
  };

  const handleProcessedFeedbackClick = async () => {
    if (selectedFeedbackId !== null) {
      try {
        await processedFeedback({ feedbackId: selectedFeedbackId }).unwrap();
        showNotification("Зворотний зв'язок оброблено успішно", "success");
        setSelectedFeedbackId(null);
      } catch (error: any) {
        const errorMessage = handleApiError(error);
        showNotification(errorMessage, "error");
      }
    }
  };

  const handleUserDetailClick = (user: IUser) => () => {
    setSelectedUser(user);
    setIsUserDetailDialogOpen(true);
  };

  const handleFeedbackDetailClick = (feedback: IFeedback) => () => {
    setSelectedFeedback(feedback);
    setIsFeedbackDetailDialogOpen(true);
  };

  return {
    rows,
    isFeedbacksLoading,
    errorFeedbacks,
    isUserDetailDialogOpen,
    isFeedbackDetailDialogOpen,
    selectedFeedbackId,
    selectedUser,
    selectedFeedback,
    handleProcessedFeedbackClick,
    handleUserDetailClick,
    handleFeedbackDetailClick,
    setIsUserDetailDialogOpen,
    setIsFeedbackDetailDialogOpen,
    handleFeedbacksCheckboxChange,
    NotificationComponent,
  };
};
