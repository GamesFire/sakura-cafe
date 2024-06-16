import type { FC } from "react";
import {
  DataGrid,
  GridColDef,
  type GridRenderCellParams,
  type GridRowParams,
} from "@mui/x-data-grid";
import { CircularProgress, Box, Typography, Button } from "@mui/material";
import UserDetailDialog from "../users/UserDetailDialog";
import ProcessedFeedbackButtonCell from "./ProcessedButtonCell";
import { useFeedbackHandlers } from "./useFeedbacksHandlers";
import ErrorAlert from "../ErrorAlert";
import FeedbackDetailDialog from "./FeedbackDetailDialog";
import { truncateString } from "@/utils/truncateString";

const Feedbacks: FC = () => {
  const {
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
  } = useFeedbackHandlers();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      resizable: false,
      disableColumnMenu: true,
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
            onClick={handleUserDetailClick(params.row.user)}
          >
            {truncateString(params.row.user.name, 10)}
          </Button>
        );
      },
    },
    {
      field: "message",
      headerName: "Тема та повідомлення",
      width: 260,
      sortable: false,
      resizable: false,
      renderCell: (params) => {
        return (
          <Button
            className="btn"
            onClick={handleFeedbackDetailClick(params.row)}
          >
            Переглянути
          </Button>
        );
      },
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
      field: "isProcessed",
      headerName: "Оброблено",
      width: 100,
      valueGetter: (value) => (value ? "Так" : "Ні"),
    },
    {
      field: "Відмітити, як оброблений",
      headerName: "",
      width: 240,
      hideable: false,
      resizable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <ProcessedFeedbackButtonCell
          selectedFeedbackId={selectedFeedbackId}
          params={params}
          handleProcessedFeedbackClick={handleProcessedFeedbackClick}
        />
      ),
    },
  ];

  if (isFeedbacksLoading) {
    return (
      <Box className="flex justify-center items-center h-full">
        <CircularProgress size={100} sx={{ color: "#77374F" }} />
      </Box>
    );
  }

  if (errorFeedbacks) {
    return <ErrorAlert />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" align="center" marginBlock={2}>
        Список зворотніх зв'язків
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        isRowSelectable={(params: GridRowParams) => !params.row.isProcessed}
        checkboxSelection
        getRowId={(row) => row.id}
        autoHeight
        onRowSelectionModelChange={handleFeedbacksCheckboxChange}
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
      {selectedFeedback && (
        <FeedbackDetailDialog
          feedback={selectedFeedback}
          open={isFeedbackDetailDialogOpen}
          onClose={() => setIsFeedbackDetailDialogOpen(false)}
        />
      )}
    </Box>
  );
};

export default Feedbacks;
