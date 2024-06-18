import type { FC } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useOrdersHandlers } from "./useOrdersHandlers";
import UserDetailDialog from "../users/UserDetailDialog";
import FoodsDetailDialog from "../foods/FoodsDetailDialog";
import { getOrdersActions } from "./getOrdersActions";
import ErrorAlert from "../ErrorAlert";
import { truncateString } from "@/utils/truncateString";

const Orders: FC = () => {
  const {
    rows,
    ordersLoading,
    foodsDataLoading,
    errorOrders,
    errorFoodsData,
    isUserDetailDialogOpen,
    isFoodsDetailDialogOpen,
    selectedUser,
    selectedFoods,
    handleAcceptOrder,
    handleRejectOrder,
    handleUserDetailClick,
    handleFoodsDetailClick,
    setIsUserDetailDialogOpen,
    setIsFoodsDetailDialogOpen,
    NotificationComponent,
  } = useOrdersHandlers();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      resizable: false,
      disableColumnMenu: true,
    },
    {
      field: "status",
      headerName: "Статус",
      width: 160,
      resizable: false,
      valueGetter: (value: string) => value.toUpperCase(),
    },
    {
      field: "date",
      headerName: "Дата та час",
      type: "dateTime",
      width: 200,
      resizable: false,
      valueGetter: (value) => new Date(value),
    },
    {
      field: "user",
      headerName: "Користувач",
      flex: 1,
      resizable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            className="btn"
            onClick={handleUserDetailClick(params.row.tray.user)}
          >
            {truncateString(params.row.tray.user.name, 10)}
          </Button>
        );
      },
    },
    {
      field: "foods",
      headerName: "Їжа",
      width: 300,
      resizable: false,
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            className="btn"
            onClick={handleFoodsDetailClick(params.row.tray.foods)}
          >
            Переглянути їжу
          </Button>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Дії",
      headerAlign: "center",
      align: "right",
      width: 100,
      resizable: false,
      sortable: false,
      disableColumnMenu: true,
      hideable: false,
      getActions: getOrdersActions(handleAcceptOrder, handleRejectOrder),
    },
  ];

  if (ordersLoading || foodsDataLoading) {
    return (
      <Box className="flex justify-center items-center h-full">
        <CircularProgress size={100} sx={{ color: "#77374F" }} />
      </Box>
    );
  }

  if (errorOrders || errorFoodsData) {
    return <ErrorAlert />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBlock: { sm: 2, xxl: 6 } }}
      >
        Список замовлень
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        initialState={{
          sorting: {
            sortModel: [{ field: "date", sort: "desc" }],
          },
        }}
      />
      {selectedUser && (
        <UserDetailDialog
          user={selectedUser}
          open={isUserDetailDialogOpen}
          onClose={() => setIsUserDetailDialogOpen(false)}
        />
      )}
      <FoodsDetailDialog
        foods={selectedFoods}
        open={isFoodsDetailDialogOpen}
        onClose={() => setIsFoodsDetailDialogOpen(false)}
      />
      {NotificationComponent}
    </Box>
  );
};

export default Orders;
