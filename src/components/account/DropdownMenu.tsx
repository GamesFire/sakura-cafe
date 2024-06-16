import type { FC } from "react";
import { Menu, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store/store";
import { clearTray } from "@/store/slices/traySlice";
import { removeCredentials } from "@/store/slices/authenticationSlice";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@/constants/RoutePaths";
import { useLogoutMutation } from "@/services/authentication";
import { useHandleAddFoodsToTray } from "@/hooks/useAddFoodsToTrayHandler";
import { clearOrders } from "@/store/slices/orderSlice";
import { clearRating } from "@/store/slices/ratingSlice";

interface DropdownMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
}

const DropdownMenu: FC<DropdownMenuProps> = ({ anchorEl, handleClose }) => {
  const { userInfo } = useAppSelector(
    (state: RootState) => state.authenticationSlice
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const handleAddFoodsToTray = useHandleAddFoodsToTray();
  const open = Boolean(anchorEl);

  const handleLogout = async () => {
    await logout();
    await handleAddFoodsToTray();
    dispatch(clearTray());
    dispatch(clearOrders());
    dispatch(clearRating());
    dispatch(removeCredentials());
    handleClose();
    navigate(RoutePaths.HOME_PAGE);
  };

  const handleOrderHistory = () => {
    navigate(RoutePaths.ORDER_HISTORY_PAGE);
    handleClose();
  };

  const handleAdminPanel = () => {
    navigate(RoutePaths.ADMIN_PAGE);
    handleClose();
  };

  return (
    <Menu
      sx={{
        marginTop: "4px",
        "& .MuiPaper-root": {
          backgroundColor: "#FDB3BD",
          direction: "rtl",
        },
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "account-button",
      }}
    >
      {userInfo?.role !== "guest" && (
        <MenuItem onClick={handleOrderHistory}>Історія замовлень</MenuItem>
      )}
      {userInfo?.role === "admin" && (
        <MenuItem onClick={handleAdminPanel}>Адмін панель</MenuItem>
      )}
      <MenuItem onClick={handleLogout}>Вихід</MenuItem>
    </Menu>
  );
};

export default DropdownMenu;
