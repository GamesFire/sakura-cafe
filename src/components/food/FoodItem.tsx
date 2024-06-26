import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { IFood } from "@/store/models/IFood";
import AddToTrayButton from "../tray/AddToTrayButton";
import NavigationManager from "@/utils/NavigationManager";
import { useImageUrls } from "@/hooks/useImageUrls";

interface FoodItemProps {
  food: IFood;
}

const FoodItem: FC<FoodItemProps> = ({ food }) => {
  const navigate = useNavigate();

  const foodItemImagePath = food ? [food.image] : [];
  const foodItemImageUrl = useImageUrls(foodItemImagePath);

  const handleClickNavigate = () => {
    NavigationManager.navigateToFoodDetail(navigate, food.id);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        maxWidth: { xs: "460px", xxl: "560px" },
        height: { xs: "200px", xxl: "240px" },
        marginInline: { xs: "8px", sm: "auto" },
        backgroundColor: "#FFE8E8",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: "100px", sm: "180px", xxl: "220px" },
          cursor: "pointer",
        }}
        image={foodItemImageUrl[0]}
        loading="lazy"
        alt={`Зображення ${food.name}`}
        onClick={handleClickNavigate}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: 0,
          ":last-child": {
            paddingBottom: 2,
          },
          flex: "1",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            flex: 1,
          }}
        >
          <Typography
            component="h6"
            sx={{
              fontSize: { xs: "1.15rem", sm: "1.5rem", xxl: "1.875rem" },
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleClickNavigate}
            gutterBottom
          >
            {food.name}
          </Typography>
          <Typography component="div" variant="body2" gutterBottom>
            Ціна: {food.price}&nbsp;&#165;
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
              Рейтинг: {food.rating}
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
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <AddToTrayButton food={food} paddingBlock={1} paddingInline={2} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodItem;
