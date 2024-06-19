import type { FC } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IFood } from "@/store/models/IFood";
import { useAppDispatch } from "@/hooks/redux";
import { removeFoodFromTray } from "@/store/slices/traySlice";
import { useImageUrls } from "@/hooks/useImageUrls";

interface FoodItemInTrayProps {
  food: IFood;
}

const FoodItemInTray: FC<FoodItemInTrayProps> = ({ food }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isXxl = useMediaQuery(theme.breakpoints.up("xxl"));

  const foodItemInTrayImagePath = food ? [food.image] : [];
  const foodItemInTrayImageUrl = useImageUrls(foodItemInTrayImagePath);

  const handleClickDelete = () => {
    dispatch(removeFoodFromTray(food.id));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        width: "100%",
        height: { sm: "80px", xxl: "100px" },
        backgroundColor: "#FFE8E8",
        borderRadius: "16px",
        overflow: "hidden",
        ":not(:last-child)": {
          marginBottom: 2,
        },
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: isXs ? "60px" : isXxl ? "120px" : "100px" }}
        image={foodItemInTrayImageUrl[0]}
        loading="lazy"
        alt={`Зображення ${food.name}`}
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: isXs ? "flex-start" : "center",
          flex: 1,
          padding: "8px",
          ":last-child": {
            paddingBottom: 1,
          },
        }}
      >
        <Box display="flex" flexDirection="column" flex={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flex={1}
            flexDirection={isXs ? "column" : "row"}
          >
            <Typography
              component="h6"
              variant="h6"
              textAlign={isXs ? "left" : "center"}
            >
              {food.name}
            </Typography>
            <Typography
              component="p"
              variant="body2"
              textAlign={isXs ? "left" : "center"}
            >
              {food.price} &#165;
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent={isXs ? "flex-start" : "center"}
            alignItems="center"
          >
            {food.rating}
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
        <Box marginLeft={isXs ? 0 : 2} marginTop={isXs ? 1 : 0}>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={handleClickDelete}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodItemInTray;
