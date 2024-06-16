import type { FC } from "react";
import { useGetUsersQuery } from "@/services/user";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import AdminButtonCell from "./AdminButtonCell";
import { CircularProgress, Box, Typography } from "@mui/material";
import ErrorAlert from "../ErrorAlert";
import { useUsersHandlers } from "./useUsersHandlers";

const Users: FC = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const { selectedUserId, handleUsersCheckboxChange, handleAddAdminClick } =
    useUsersHandlers();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      resizable: false,
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: "Ім'я",
      flex: 1,
      resizable: false,
    },
    {
      field: "email",
      headerName: "E-mail",
      flex: 1,
      resizable: false,
    },
    {
      field: "role",
      headerName: "Роль",
      width: 130,
      resizable: false,
    },
    {
      field: "Зробити адміністратором",
      headerName: "",
      width: 260,
      hideable: false,
      resizable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <AdminButtonCell
          selectedUserId={selectedUserId}
          params={params}
          handleAddAdminClick={handleAddAdminClick}
        />
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
        Список усіх користувачів
      </Typography>
      <DataGrid
        rows={users || []}
        columns={columns}
        isRowSelectable={(params: GridRowParams) => params.row.role === "user"}
        checkboxSelection
        onRowSelectionModelChange={handleUsersCheckboxChange}
        disableMultipleRowSelection
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  );
};

export default Users;
