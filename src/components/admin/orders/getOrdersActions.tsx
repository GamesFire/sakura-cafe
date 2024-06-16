import { GridActionsCellItem } from "@mui/x-data-grid";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Statuses } from "@/types/Status";

export const getOrdersActions =
  (
    handleAcceptOrder: (id: number) => void,
    handleRejectOrder: (id: number) => void
  ) =>
  (params: any) =>
    [
      <GridActionsCellItem
        icon={<CheckCircleOutlinedIcon />}
        label="Прийняти замовлення"
        onClick={() => handleAcceptOrder(params.id as number)}
        showInMenu
        disabled={params.row.status !== Statuses.PENDING}
      />,
      <GridActionsCellItem
        icon={<HighlightOffOutlinedIcon />}
        label="Відхилити замовлення"
        onClick={() => handleRejectOrder(params.id as number)}
        showInMenu
        disabled={params.row.status !== Statuses.PENDING}
      />,
    ];
