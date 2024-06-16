import type { FC } from "react";
import { IFood } from "@/store/models/IFood";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";

interface FoodsDetailProps {
  foods: IFood[];
  open: boolean;
  onClose: () => void;
}

const FoodsDetailDialog: FC<FoodsDetailProps> = ({ foods, open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    sx={{
      "& .MuiPaper-root": {
        backgroundColor: "#FFFFFF",
      },
    }}
  >
    <DialogTitle>Детальна інформація про замовлену їжу</DialogTitle>
    <DialogContent>
      <List>
        {foods.map((food) => (
          <ListItem key={food.id}>
            <Card
              variant="outlined"
              sx={{
                display: "flex",
                width: "600px",
                height: "180px",
                marginInline: "auto",
                backgroundColor: "#FFE8E8",
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: "200px" }}
                image={`${import.meta.env.VITE_API_URL}/${food.image}`}
                loading="lazy"
                alt={`Зображення ${food.name}`}
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
                  variant="h5"
                  sx={{ textAlign: "center" }}
                  gutterBottom
                >
                  {food.name}
                </Typography>
                <Typography component="div" variant="body2" gutterBottom>
                  <span className="font-bold">Ціна: </span>
                  {food.price}&nbsp;&#165;
                </Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <Typography component="div" variant="body2">
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
                <Typography component="div" variant="body2" gutterBottom>
                  <span className="font-bold">Інгредієнти: </span>
                  {food.ingredients
                    .map((ingredient) => ingredient.title)
                    .join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </DialogContent>
    <DialogActions>
      <Button className="btn" onClick={onClose}>
        Закрити
      </Button>
    </DialogActions>
  </Dialog>
);

export default FoodsDetailDialog;
