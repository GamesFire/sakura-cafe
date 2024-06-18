import { type FC, MouseEvent, RefObject } from "react";
import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store/store";
import useNotification from "@/hooks/useNotification";
import {
  Box,
  Typography,
  IconButton,
  Modal,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TrayContent from "./TrayContent";

interface TrayModalProps {
  open: boolean;
  onClose: (event: MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onOrderSuccess: () => void;
  anchorRef: RefObject<HTMLButtonElement>;
}

const TrayModal: FC<TrayModalProps> = ({
  open,
  onClose,
  onOrderSuccess,
  anchorRef,
}) => {
  const { tray } = useAppSelector((state: RootState) => state.traySlice);
  const { showNotification, notificationOpen, NotificationComponent } =
    useNotification();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isXxl = useMediaQuery(theme.breakpoints.up("xxl"));

  const getModalStyle = () => {
    if (!anchorRef.current) {
      return {};
    }

    const rect = anchorRef.current.getBoundingClientRect();

    return {
      top: `${rect.bottom + window.scrollY}px`,
      left: `${!isXs && !isSm && rect.right + window.scrollX}px`,
      transform: `${!isXs && !isSm && "translateX(-100%)"}`,
    };
  };

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        slotProps={{
          backdrop: {
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          },
        }}
      >
        <Box
          onClick={(event: MouseEvent<HTMLDivElement>) => onClose(event)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100%",
            overflowY: "auto",
          }}
        >
          <Box
            onClick={handleContentClick}
            sx={{
              ...getModalStyle(),
              position: isXs || isSm ? "fixed" : "absolute",
              width: isXs || isSm ? "90%" : isXxl ? 660 : 560,
              height: isXs || isSm ? 400 : isXxl ? 680 : 580,
              bgcolor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
              p: 2,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={(event: MouseEvent<HTMLButtonElement>) => onClose(event)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              sx={{
                position: "absolute",
                top: 8,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              Ваша таця
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: tray && tray.foods.length > 0 ? "80%" : "auto",
                overflowY: "auto",
                paddingRight: 2,
                paddingBottom: 2,
              }}
            >
              <TrayContent
                showNotification={showNotification}
                notificationOpen={notificationOpen}
                onOrderSuccess={onOrderSuccess}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
      {NotificationComponent}
    </>
  );
};

export default TrayModal;
