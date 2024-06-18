import { useEffect, useState, FC } from "react";
import { IFood } from "@/store/models/IFood";
import {
  Box,
  Typography,
  Grid,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import IngredientImageCarousel from "../carousels/IngredientImageCarousel";
import {
  useCreateRatingMutation,
  useDeleteRatingMutation,
} from "@/services/rating";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addRating, removeRating } from "@/store/slices/ratingSlice";
import type { RootState } from "@/store/store";
import AddToTrayButton from "../tray/AddToTrayButton";
import useNotification from "@/hooks/useNotification";

interface FoodItemDetailProps {
  foodDetail: IFood;
  refetchFood: () => void;
}

const FoodItemDetail: FC<FoodItemDetailProps> = ({
  foodDetail,
  refetchFood,
}) => {
  const { userInfo } = useAppSelector(
    (state: RootState) => state.authenticationSlice
  );
  const userRating = useAppSelector(
    (state: RootState) => state.ratingSlice[foodDetail.id] ?? null
  );
  const [rate, setRate] = useState<number | null>(userRating);
  const [createRating] = useCreateRatingMutation();
  const [deleteRating] = useDeleteRatingMutation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const { showNotification, NotificationComponent } = useNotification();

  const handleRateChange = async (newRate: number | null) => {
    if (!userInfo) {
      showNotification("Будь ласка, увійдіть у систему, щоб поставити оцінку.");
      return;
    }

    if (userInfo.role === "guest") {
      showNotification(
        "Будь ласка, підтвердіть свою електронну пошту, щоб поставити оцінку."
      );
      return;
    }

    if (newRate === null) {
      if (rate !== null) {
        await deleteRating(foodDetail.id);
        dispatch(removeRating(foodDetail.id));
      }
    } else {
      await createRating({ foodId: foodDetail.id, rate: newRate });
      dispatch(addRating({ foodId: foodDetail.id, rate: newRate }));
    }
    setRate(newRate);
    refetchFood();
  };

  useEffect(() => {
    setRate(userRating);
  }, [userRating]);

  useEffect(() => {
    userInfo ? setRate(userRating) : setRate(null);
  }, [userInfo, userRating]);

  return (
    <>
      <Grid container spacing={2} sx={{ flex: 1 }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              width: "100%",
              maxWidth: { sm: "500px", xxl: "600px" },
              height: { sm: "500px", xxl: "600px" },
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: "16px",
            }}
            src={`${import.meta.env.VITE_API_URL}/${foodDetail.image}`}
            alt={`Зображення ${foodDetail.name}`}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              sx={{
                fontSize: { xs: "2rem", sm: "3rem", xxl: "3.75rem" },
                marginBottom: { sm: "4px", xxl: 4 },
              }}
            >
              {foodDetail.name}
            </Typography>
            <Typography variant="body2" marginBottom={4}>
              <span className="font-bold">Категорія:</span>{" "}
              {foodDetail.category.name}
            </Typography>
          </Box>
          <Typography
            marginBottom={1}
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem", xxl: "1.5rem" },
            }}
          >
            <span className="font-bold">Ціна:</span> {foodDetail.price}
            &nbsp;&#165;
          </Typography>
          <Box display="flex" alignItems="center" marginBottom={1}>
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", xxl: "1.5rem" },
              }}
            >
              <span className="font-bold">Рейтинг:</span> {foodDetail.rating}
            </Typography>
            <Rating
              name="half-rating-read"
              precision={0.1}
              max={5.0}
              value={Number(foodDetail.rating)}
              size={isXs ? "small" : "medium"}
              sx={{ marginLeft: "0.2rem" }}
              readOnly
            />
          </Box>
          <Box display="flex" alignItems="center" marginBottom={1}>
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.25rem", xxl: "1.5rem" },
              }}
            >
              <span className="font-bold">Ваша оцінка:</span>
            </Typography>
            <Rating
              name="simple-controlled"
              max={5}
              size={isXs ? "small" : "medium"}
              value={rate}
              onChange={(_event, newValue) => handleRateChange(newValue)}
              sx={{ marginLeft: "0.2rem" }}
            />
          </Box>
          <Typography
            gutterBottom
            sx={{
              fontSize: { xs: "1rem", sm: "1.25rem", xxl: "1.5rem" },
            }}
          >
            <span className="font-bold">Інгредієнти:</span>
          </Typography>
          <IngredientImageCarousel ingredients={foodDetail.ingredients} />
          <Box display="flex" justifyContent="center" marginTop="32px">
            <AddToTrayButton
              food={foodDetail}
              paddingBlock={2}
              paddingInline={4}
            />
          </Box>
        </Grid>
      </Grid>
      {NotificationComponent}
    </>
  );
};

export default FoodItemDetail;
