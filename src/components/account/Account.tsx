import { useEffect, useState, type FC } from "react";
import AuthenticationDialogs from "./AuthenticationDialogs";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store/store";
import DropdownMenu from "./DropdownMenu";
import { Button } from "@mui/material";
import { useLazyGetMostRecentTrayQuery } from "@/services/tray";
import { setTray } from "@/store/slices/traySlice";
import { truncateString } from "@/utils/truncateString";
import ConfirmationWarningDialog from "./ConfirmationWarningDialog";

const Account: FC = () => {
  const { userInfo } = useAppSelector(
    (state: RootState) => state.authenticationSlice
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [getMostRecentTray] = useLazyGetMostRecentTrayQuery();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (userInfo) {
      setAnchorEl(event.currentTarget);
    } else {
      setOpenDialog(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchFoodsData = async () => {
      if (userInfo) {
        const result = await getMostRecentTray();

        if (!result.data) return;

        dispatch(setTray(result.data));
      }
    };

    fetchFoodsData();
  }, [userInfo, dispatch, getMostRecentTray]);

  return (
    <>
      <Button
        className="btn before:inline-block before:w-6 before:h-6 before:content-accountIcon"
        sx={{
          marginRight: 4,
          paddingBlock: "0.5rem",
          paddingInline: "0.75rem",
          borderRadius: "16px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        aria-controls={anchorEl ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={!!anchorEl}
        onClick={handleClick}
      >
        <span className="ml-2">
          {userInfo ? truncateString(userInfo.name, 8) : "Вхід"}
        </span>
      </Button>
      {userInfo ? (
        <>
          <DropdownMenu anchorEl={anchorEl} handleClose={handleClose} />
          <ConfirmationWarningDialog />
        </>
      ) : (
        <AuthenticationDialogs
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      )}
    </>
  );
};

export default Account;
