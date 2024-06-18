import { useEffect, useState, type FC } from "react";
import { IFood } from "@/store/models/IFood";
import { Button } from "@mui/material";
import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store/store";
import useNotification from "@/hooks/useNotification";
import { addToTray } from "@/utils/addToTray";

interface AddToTrayButtonProps {
  food: IFood;
  paddingBlock: number;
  paddingInline: number;
}

const AddToTrayButton: FC<AddToTrayButtonProps> = ({
  food,
  paddingBlock,
  paddingInline,
}) => {
  const { userInfo } = useAppSelector(
    (state: RootState) => state.authenticationSlice
  );
  const { tray } = useAppSelector((state: RootState) => state.traySlice);
  const { showNotification, notificationOpen, NotificationComponent } =
    useNotification();
  const isFoodInTray = tray?.foods.some((item) => item.id === food.id);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const handleClickFood = () => {
    if (!userInfo) {
      showNotification(
        "Будь ласка, увійдіть у систему, щоб додати їжу до таці."
      );
      return;
    }

    addToTray(food);
  };

  useEffect(() => {
    if (userInfo && (isFoodInTray || notificationOpen)) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [userInfo, tray, notificationOpen, isFoodInTray]);

  return (
    <>
      <Button
        className="btn"
        sx={{
          paddingBlock: { sm: paddingBlock, xxl: "1rem" },
          paddingInline: { sm: paddingInline, xxl: "2rem" },
          borderRadius: "16px",
        }}
        onClick={handleClickFood}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? "Вже у таці" : "Додати до таці"}
      </Button>
      {NotificationComponent}
    </>
  );
};

export default AddToTrayButton;
