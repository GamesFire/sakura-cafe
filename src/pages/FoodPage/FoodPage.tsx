import type { FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetFoodByIdQuery } from "@/services/food";
import { Box, CircularProgress, Alert, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FoodItemDetail from "@/components/food/FoodItemDetail";
import { useGetOneRatingQuery } from "@/services/rating";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addRating } from "@/store/slices/ratingSlice";
import { useEffect, useCallback } from "react";
import type { RootState } from "@/store/store";

const FoodPage: FC = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(
    (state: RootState) => state.authenticationSlice
  );
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const {
    data: food,
    isLoading: isFoodByIdLoading,
    error,
    refetch: refetchFood,
  } = useGetFoodByIdQuery(Number(id));
  const {
    data: rating,
    isLoading: isOneRatingLoading,
    refetch: refetchRating,
  } = useGetOneRatingQuery(Number(id));

  const refetchRatingAndSet = useCallback(() => {
    refetchRating();
  }, [refetchRating]);

  useEffect(() => {
    if (rating) {
      dispatch(addRating({ foodId: Number(id), rate: rating.rate }));
    }
  }, [rating, dispatch, id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    refetchRatingAndSet();
  }, [userInfo, refetchRatingAndSet]);

  if (isFoodByIdLoading || isOneRatingLoading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress size={100} sx={{ color: "#77374F" }} />
      </Box>
    );
  }

  if (error || !food) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Alert
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "90%", sm: "40%" },
            fontSize: "16px",
            textAlign: "center",
            marginBlock: 16,
          }}
          severity="error"
          variant="outlined"
        >
          Помилка завантаження даних про їжу
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        paddingTop: 8,
        paddingBottom: 4,
        paddingInline: { xs: 2, sm: 12 },
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: 16, left: 16 }}
        onClick={handleBackClick}
      >
        <ArrowBackIcon />
      </IconButton>
      <FoodItemDetail foodDetail={food} refetchFood={refetchFood} />
    </Box>
  );
};

export default FoodPage;
