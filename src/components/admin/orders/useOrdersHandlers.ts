import { useAppDispatch } from "@/hooks/redux";
import { useHandleApiError } from "@/hooks/useHandleApiError";
import useNotification from "@/hooks/useNotification";
import { useGetFoodsQuery } from "@/services/food";
import {
  useAcceptOrderMutation,
  useGetOrdersQuery,
  useRejectOrderMutation,
} from "@/services/order";
import { IFood } from "@/store/models/IFood";
import { IOrder } from "@/store/models/IOrder";
import { IUser } from "@/store/models/IUser";
import { setFoods } from "@/store/slices/foodSlice";
import { setOrders, updateCurrentOrder } from "@/store/slices/orderSlice";
import { useEffect, useState } from "react";

export const useOrdersHandlers = () => {
  const dispatch = useAppDispatch();
  const {
    data: ordersData,
    isLoading: ordersLoading,
    error: errorOrders,
  } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const {
    data: foodsData,
    isLoading: foodsDataLoading,
    error: errorFoodsData,
  } = useGetFoodsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [acceptOrder] = useAcceptOrderMutation();
  const [rejectOrder] = useRejectOrderMutation();
  const [rows, setRows] = useState<IOrder[]>([]);
  const [isUserDetailDialogOpen, setIsUserDetailDialogOpen] =
    useState<boolean>(false);
  const [isFoodsDetailDialogOpen, setIsFoodsDetailDialogOpen] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [selectedFoods, setSelectedFoods] = useState<IFood[]>([]);
  const { showNotification, NotificationComponent } = useNotification();
  const handleApiError = useHandleApiError();

  useEffect(() => {
    if (ordersData) {
      dispatch(setOrders(ordersData));
      setRows(ordersData);
    }
    if (foodsData) {
      dispatch(setFoods(foodsData));
    }
  }, [ordersData, foodsData, dispatch]);

  const handleAcceptOrder = async (id: number) => {
    try {
      const result = await acceptOrder({
        orderId: id,
      }).unwrap();

      if (result) {
        showNotification("Замовлення успішно прийнято", "success");
        dispatch(updateCurrentOrder(result));
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === id ? result : row))
        );
      }
    } catch (error: any) {
      const errorMessage = handleApiError(error);
      showNotification(errorMessage, "error");
    }
  };

  const handleRejectOrder = async (id: number) => {
    try {
      const result = await rejectOrder({
        orderId: id,
      }).unwrap();

      if (result) {
        showNotification("Замовлення успішно відхилено", "success");
        dispatch(updateCurrentOrder(result));
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === id ? result : row))
        );
      }
    } catch (error: any) {
      const errorMessage = handleApiError(error);
      showNotification(errorMessage, "error");
    }
  };

  const handleUserDetailClick = (user: IUser) => () => {
    setSelectedUser(user);
    setIsUserDetailDialogOpen(true);
  };

  const handleFoodsDetailClick = (foods: IFood[]) => () => {
    setSelectedFoods(foods);
    setIsFoodsDetailDialogOpen(true);
  };

  return {
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
  };
};
