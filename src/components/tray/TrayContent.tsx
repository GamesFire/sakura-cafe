import type { FC } from "react";
import type { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useHandleAddFoodsToTray } from "@/hooks/useAddFoodsToTrayHandler";
import { useCreateOrderMutation } from "@/services/order";
import { useLazyGetMostRecentTrayQuery } from "@/services/tray";
import calculateTotalPrice from "@/utils/calculateTotalPrice";
import { setTray } from "@/store/slices/traySlice";
import {
  Box,
  Typography,
  Button,
  AlertProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FoodItemInTray from "../food/FoodItemInTray";
import { useHandleApiError } from "@/hooks/useHandleApiError";

interface TrayContentProps {
  showNotification: (
    message: string,
    severity?: AlertProps["severity"]
  ) => void;
  notificationOpen: boolean;
  onOrderSuccess: () => void;
}

const TrayContent: FC<TrayContentProps> = ({
  showNotification,
  notificationOpen,
  onOrderSuccess,
}) => {
  const { userInfo } = useAppSelector(
    (state: RootState) => state.authenticationSlice
  );
  const { tray } = useAppSelector((state: RootState) => state.traySlice);
  const handleAddFoodsToTray = useHandleAddFoodsToTray();
  const handleApiError = useHandleApiError();
  const [createOrder] = useCreateOrderMutation();
  const [getMostRecentTray] = useLazyGetMostRecentTrayQuery();
  const dispatch = useAppDispatch();
  const totalPrice = calculateTotalPrice(tray?.foods ?? []);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleClickOrder = async () => {
    if (!userInfo) {
      showNotification(
        "Будь ласка, увійдіть у систему, щоб оформити замовлення."
      );
      return;
    }

    if (userInfo.role === "guest") {
      showNotification(
        "Будь ласка, підтвердіть свою електронну пошту, щоб оформити замовлення."
      );
      return;
    }

    try {
      await handleAddFoodsToTray();
      const { data: orderData, error: orderError } = await createOrder();
      const { data: newTrayData, error: newTrayError } =
        await getMostRecentTray();

      if (orderError) {
        const errorMessage = handleApiError(orderError);
        showNotification(errorMessage, "error");
        return;
      }

      if (newTrayError) {
        const errorMessage = handleApiError(newTrayError);
        showNotification(errorMessage, "error");
        return;
      }

      if (!orderData || !newTrayData) return;

      dispatch(setTray(newTrayData));
      onOrderSuccess();

      showNotification(
        `Замовлення успішно оформлено! Перевірити статус замовлення можна на сторінці "Історія замовлень".`,
        "success"
      );
    } catch (error) {
      const errorMessage = handleApiError(error);
      showNotification(errorMessage, "error");
    }
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        position: "relative",
      }}
    >
      {!tray || tray.foods.length === 0 ? (
        <>
          <Box
            component="img"
            sx={{
              width: { sm: 64, xxl: 100 },
              height: { sm: 64, xxl: 100 },
              mb: 2,
            }}
            alt="Empty Cart"
            src="/images/icons/empty-tray.png"
          />
          <Typography
            id="modal-description"
            variant="body1"
            color="textSecondary"
            gutterBottom
          >
            У таці порожньо
          </Typography>
          <Typography variant="body1">Додайте кілька страв із меню</Typography>
        </>
      ) : (
        <>
          <Box
            sx={{
              flex: "1",
              overflowY: "auto",
              width: "100%",
            }}
          >
            {tray?.foods.map((food) => (
              <FoodItemInTray key={food.id} food={food} />
            ))}
          </Box>
          <Box
            sx={{
              position: isXs || isSm ? "static" : "fixed",
              bottom: isXs || isSm ? "unset" : 0,
              left: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: isXs || isSm ? "column" : "row",
              width: "100%",
              zIndex: 1,
              backgroundColor: "inherit",
              borderTop: isXs || isSm ? "none" : "1px solid #dddddd",
              padding: 2,
            }}
          >
            <Typography variant="h6" marginBottom={isXs || isSm ? 2 : 0}>
              Загальна ціна:{" "}
              <span className="font-bold">{totalPrice}&nbsp;&#165;</span>
            </Typography>
            <Button
              className="btn"
              variant="contained"
              disabled={notificationOpen}
              onClick={handleClickOrder}
            >
              Оформити замовлення
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default TrayContent;
