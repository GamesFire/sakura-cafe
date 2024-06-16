import type { FC } from "react";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Rating,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetMostPopularFoodQuery } from "@/services/food";
import AddToTrayButton from "../tray/AddToTrayButton";
import NavigationManager from "@/utils/NavigationManager";

const MostPopularFood: FC = () => {
  const navigate = useNavigate();
  const {
    data: mostPopularFood,
    isLoading,
    error,
  } = useGetMostPopularFoodQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const handleClick = () => {
    if (mostPopularFood) {
      NavigationManager.navigateToFoodDetail(navigate, mostPopularFood.id);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", marginBlock: 16 }}>
        <CircularProgress size={100} sx={{ color: "#77374F" }} />
      </Box>
    );
  }

  if (error || !mostPopularFood) {
    return (
      <Alert
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: { xs: "90%", sm: "40%" },
          fontSize: "16px",
          textAlign: "center",
          marginInline: "auto",
          marginBlock: 16,
        }}
        severity="error"
        variant="outlined"
      >
        Помилка завантаження найпопулярнішої їжі з усіх
      </Alert>
    );
  }

  return (
    <Box component="section" className="max-lg:mt-16 max-lg:mb-24 mt-20 mb-32">
      <Container>
        <Typography
          component="h4"
          sx={{
            fontSize: { xs: "1.25rem", sm: "2.125rem" },
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          Найпопулярніша їжа з усіх
        </Typography>
        {!isLoading && !error && mostPopularFood && (
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              maxWidth: "600px",
              marginInline: "auto",
              backgroundColor: "#FFE8E8",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: { xs: "100px", sm: "200px" }, cursor: "pointer" }}
              image={`${import.meta.env.VITE_API_URL}/${mostPopularFood.image}`}
              loading="lazy"
              alt={`Зображення ${mostPopularFood.name} найпопулярнішої їжі з усіх`}
              onClick={handleClick}
            />
            <CardContent
              sx={{
                paddingBottom: 0,
                ":last-child": {
                  paddingBottom: 2,
                },
                flex: "1",
              }}
            >
              <Typography
                component="h5"
                sx={{
                  fontSize: { xs: "1.15rem", sm: "1.5rem" },
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={handleClick}
                gutterBottom
              >
                {mostPopularFood.name}
              </Typography>
              <Typography component="div" variant="body2" gutterBottom>
                Ціна: {mostPopularFood.price}&nbsp;&#165;
              </Typography>
              <Box
                mb={1}
                sx={{
                  display: "flex",
                  alignItems: { xs: "flex-start", sm: "center" },
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <Typography component="div" variant="body2">
                  Рейтинг: {mostPopularFood.rating}
                </Typography>
                <Rating
                  name="half-rating-read"
                  precision={0.1}
                  max={5.0}
                  value={Number(mostPopularFood.rating)}
                  size="small"
                  sx={{ marginLeft: { xs: "0", sm: "0.2rem" } }}
                  readOnly
                />
              </Box>
              <Typography
                component="div"
                variant="body2"
                gutterBottom
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
              >
                Інгредієнти:{" "}
                {mostPopularFood.ingredients
                  .map((ingredient) => ingredient.title)
                  .join(", ")}
              </Typography>
              <Box display="flex" justifyContent="flex-end">
                <AddToTrayButton
                  food={mostPopularFood}
                  paddingBlock={8}
                  paddingInline={12}
                />
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default MostPopularFood;
