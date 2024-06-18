import { useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useAddAdminRoleForUserMutation } from "@/services/user";
import useNotification from "@/hooks/useNotification";
import { useHandleApiError } from "@/hooks/useHandleApiError";

export const useUsersHandlers = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [addAdminRoleForUser] = useAddAdminRoleForUserMutation();
  const { showNotification, NotificationComponent } = useNotification();
  const handleApiError = useHandleApiError();

  const handleUsersCheckboxChange = (selectionModel: GridRowSelectionModel) => {
    const selectedId =
      selectionModel.length > 0 ? Number(selectionModel[0]) : null;
    setSelectedUserId(selectedId);
  };

  const handleAddAdminClick = async () => {
    if (selectedUserId !== null) {
      try {
        await addAdminRoleForUser({ userId: selectedUserId }).unwrap();
        showNotification("Роль користувача успішно оновлено", "success");
        setSelectedUserId(null);
      } catch (error: any) {
        const errorMessage = handleApiError(error);
        showNotification(errorMessage, "error");
      }
    }
  };

  return {
    selectedUserId,
    handleUsersCheckboxChange,
    handleAddAdminClick,
    NotificationComponent,
  };
};
