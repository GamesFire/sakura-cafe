import { useEffect, type FC } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useLazyGetOwnOrdersQuery } from "@/services/order";
import { useLazyGetAllRatingsQuery } from "@/services/rating";
import { setOrders } from "@/store/slices/orderSlice";
import { setRating } from "@/store/slices/ratingSlice";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import FoodItemInOrder from "@/components/food/FoodItemInOrder";
import { IOrder } from "@/store/models/IOrder";
import type { RootState } from "@/store/store";

const OrderHistoryPage: FC = () => {
  const { orders } = useAppSelector((state: RootState) => state.orderSlice);

  const [
    triggerGetOwnOrders,
    { isLoading: isOrdersLoading, error: ordersError },
  ] = useLazyGetOwnOrdersQuery();
  const [
    triggerGetAllRatings,
    { isLoading: isRatingsLoading, error: ratingsError },
  ] = useLazyGetAllRatingsQuery();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchOrdersAndRatings = async () => {
      const { data: dataOrders } = await triggerGetOwnOrders();
      const { data: dataRatings } = await triggerGetAllRatings();

      if (dataOrders && dataRatings) {
        dispatch(setOrders(dataOrders));
        dispatch(setRating(dataRatings));
      }
    };

    fetchOrdersAndRatings();
  }, [triggerGetOwnOrders, triggerGetAllRatings, dispatch]);

  if (isOrdersLoading || isRatingsLoading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress size={100} sx={{ color: "#77374F" }} />
      </Box>
    );
  }

  if (ordersError || ratingsError) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Alert
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "80%", sm: "40%" },
            fontSize: "16px",
            textAlign: "center",
            marginBlock: 16,
          }}
          severity="error"
          variant="outlined"
        >
          Помилка завантаження історії замовлень
        </Alert>
      </Box>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" align="center" marginBlock={4}>
          Упс! Схоже Ви не зробили жодного замовлення :(
        </Typography>
        <Typography variant="body1" align="center">
          Додайте їжу до таці, а потім оформіть замовлення, щоб відстежувати
          його на цій сторінці.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ minHeight: "100vh" }}>
      <Typography variant="h4" align="center" marginBlock={4}>
        Ваша історія замовлень
      </Typography>
      <Box
        display="flex"
        flexDirection="column-reverse"
        justifyContent="center"
      >
        {orders.map((order: IOrder) => (
          <Box key={order.id} mb={4}>
            <FoodItemInOrder order={order} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default OrderHistoryPage;
