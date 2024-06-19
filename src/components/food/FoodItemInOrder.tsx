import { type FC, useState } from "react";
import { IOrder } from "@/store/models/IOrder";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store/store";
import calculateTotalPrice from "@/utils/calculateTotalPrice";
import { formatDateTime } from "@/utils/formatDateTime";
import {
  Card,
  CardContent,
  Collapse,
  IconButton,
  Typography,
  Box,
  CardMedia,
  Paper,
  Grid,
  Rating,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Statuses } from "@/types/Status";
import { useCancelOrderMutation } from "@/services/order";
import { updateCurrentOrder } from "@/store/slices/orderSlice";
import NavigationManager from "@/utils/NavigationManager";
import { useImageUrls } from "@/hooks/useImageUrls";

interface FoodItemInOrderProps {
  order: IOrder;
}

const FoodItemInOrder: FC<FoodItemInOrderProps> = ({ order }) => {
  const navigate = useNavigate();
  const ownRating = useAppSelector((state: RootState) => state.ratingSlice);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [cancelOrder] = useCancelOrderMutation();
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  const maxVisibleImages = isLargeScreen ? 5 : isMediumScreen ? 3 : 1;
  const visibleFoods = order.tray.foods.slice(0, maxVisibleImages);
  const hiddenFoodCount = order.tray.foods.length - maxVisibleImages;
  const totalPrice = calculateTotalPrice(order.tray.foods);
  const formattedDate = formatDateTime(new Date(order.date));

  const foodItemInOrderImagePaths = order.tray.foods.map((food) => food.image);
  const foodItemInOrderImageUrls = useImageUrls(foodItemInOrderImagePaths);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickNavigate = (foodId: number) => {
    NavigationManager.navigateToFoodDetail(navigate, foodId);
  };

  const handleCancelOrderClick = async () => {
    const result = await cancelOrder(order.id);

    if (!result.data) return;

    dispatch(updateCurrentOrder(result.data));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor:
          order.status === Statuses.REJECTED
            ? "#EF5350"
            : order.status === Statuses.ACCEPTED
            ? "#2E7D32"
            : order.status === Statuses.PENDING
            ? "#FDB3BD"
            : "#FFE8E8",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Box onClick={handleExpandClick} sx={{ cursor: "pointer" }}>
          <Box className="flex items-center flex-grow max-md:flex-col">
            <Typography className="max-md:text-center max-md:text-sm text-lg">
              {order.id}
            </Typography>
            <Box className="max-md:text-center max-md:mx-4 mx-8 max-md:mb-4">
              <Typography variant="body1">
                <span className="font-bold">Статус: </span>
                {order.status}
              </Typography>
              <Typography variant="body2" className="max-md:text-center">
                {formattedDate}
              </Typography>
            </Box>

            <Box className="flex justify-center items-center gap-1 flex-grow max-lg:mx-4 mx-8 max-md:text-center max-lg:mb-4">
              {visibleFoods.map((food, index) => (
                <CardMedia
                  component="img"
                  key={index}
                  sx={{ width: "80px", height: "50px", borderRadius: "8px" }}
                  src={foodItemInOrderImageUrls[index]}
                  alt={food.name}
                  loading="lazy"
                />
              ))}
              {hiddenFoodCount > 0 && (
                <Typography variant="body2">+{hiddenFoodCount}...</Typography>
              )}
            </Box>

            <Typography variant="body1">
              <span className="font-bold">Загальна сума: </span>
              {totalPrice}&nbsp;&#165;
            </Typography>

            <IconButton className="max-lg:text-sm text-lg">
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ ":last-child": { paddingBottom: 0 } }}>
            {order.tray.foods.map((food, index) => (
              <Paper
                key={index}
                elevation={2}
                sx={{
                  backgroundColor:
                    order.status === Statuses.REJECTED
                      ? "#EF5350"
                      : order.status === Statuses.ACCEPTED
                      ? "#2E7D32"
                      : order.status === Statuses.PENDING
                      ? "#FDB3BD"
                      : "#FFE8E8",
                  marginBottom: 2,
                }}
              >
                <Grid container justifyContent="center" alignItems="center">
                  <Box className="max-md:flex-grow">
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: "100%", sm: "180px" },
                        height: "160px",
                        borderTopLeftRadius: "4px",
                        borderBottomLeftRadius: "4px",
                        cursor: "pointer",
                      }}
                      image={foodItemInOrderImageUrls[index]}
                      alt={food.name}
                      loading="lazy"
                      onClick={() => handleClickNavigate(food.id)}
                    />
                  </Box>
                  <Box className="max-md:flex-grow-0 flex-grow">
                    <Typography variant="h6" align="center" gutterBottom>
                      {food.name}
                    </Typography>
                    <Box className="flex max-md:flex-col max-md:justify-center justify-evenly items-center">
                      <Typography variant="body2" gutterBottom>
                        <span className="font-bold">Ціна: </span>
                        {food.price}&nbsp;&#165;
                      </Typography>
                      <Box display="flex" alignItems="center" marginBottom={1}>
                        <Typography variant="body2">
                          <span className="font-bold">Рейтинг: </span>
                          {food.rating}
                        </Typography>
                        <Rating
                          name="half-rating-read"
                          precision={0.1}
                          max={5.0}
                          value={Number(food.rating)}
                          size="small"
                          sx={{ marginLeft: "0.2rem" }}
                          readOnly
                        />
                      </Box>
                      <Box display="flex" alignItems="center" marginBottom={1}>
                        <Typography variant="body2">
                          <span className="font-bold">Ваша оцінка:</span>
                        </Typography>
                        <Rating
                          name="own-rating-read"
                          max={5}
                          size="small"
                          value={ownRating[food.id]}
                          sx={{ marginLeft: "0.2rem" }}
                          readOnly
                        />
                      </Box>
                    </Box>
                    <Typography variant="body2" align="center" gutterBottom>
                      <span className="font-bold">Інгредієнти: </span>
                      {food.ingredients
                        .map((ingredient) => ingredient.title)
                        .join(", ")}
                    </Typography>
                  </Box>
                </Grid>
              </Paper>
            ))}
            {order.status === Statuses.PENDING && (
              <Box display="flex" justifyContent="flex-end" alignItems="center">
                <Button
                  className="btn"
                  sx={{
                    backgroundColor: "#FFE8E8",
                    paddingBlock: "12px",
                    paddingInline: "16px",
                    borderRadius: "16px",
                  }}
                  onClick={handleCancelOrderClick}
                >
                  Скасувати замовлення
                </Button>
              </Box>
            )}
          </CardContent>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default FoodItemInOrder;
