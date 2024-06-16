import { useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useAddAdminRoleForUserMutation } from "@/services/user";

export const useUsersHandlers = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [addAdminRoleForUser] = useAddAdminRoleForUserMutation();

  const handleUsersCheckboxChange = (selectionModel: GridRowSelectionModel) => {
    const selectedId =
      selectionModel.length > 0 ? Number(selectionModel[0]) : null;
    setSelectedUserId(selectedId);
  };

  const handleAddAdminClick = async () => {
    if (selectedUserId !== null) {
      await addAdminRoleForUser({ userId: selectedUserId });
      setSelectedUserId(null);
    }
  };

  return { selectedUserId, handleUsersCheckboxChange, handleAddAdminClick };
};
