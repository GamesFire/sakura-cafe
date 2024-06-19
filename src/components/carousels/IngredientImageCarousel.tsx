import type { FC } from "react";
import { IIngredient } from "@/store/models/IIngredient";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useImageUrls } from "@/hooks/useImageUrls";

interface IngredientImageCarouselProps {
  ingredients: IIngredient[];
}

const IngredientImageCarousel: FC<IngredientImageCarouselProps> = ({
  ingredients,
}) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isXxl = useMediaQuery(theme.breakpoints.up("xxl"));

  const ingredientImagePaths = ingredients.map(
    (ingredient) => ingredient.image
  );
  const ingredientImageUrls = useImageUrls(ingredientImagePaths);

  const getVisibleItems = () => {
    if (isXs) return 1;
    if (isSm || isMd) return 2;
    if (isXxl) return 4;
    return 3;
  };

  const visibleItems = getVisibleItems();

  const groups = ingredients.reduce((acc, ingredient, index) => {
    const groupIndex = Math.floor(index / visibleItems);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(ingredient);
    return acc;
  }, [] as IIngredient[][]);

  return (
    <Carousel
      animation="slide"
      indicators={false}
      navButtonsAlwaysVisible={true}
      autoPlay={false}
      cycleNavigation={false}
      fullHeightHover={false}
      navButtonsProps={{
        style: {
          marginTop: 8,
          backgroundColor: "black",
          filter: "brightness(120%)",
          opacity: 1,
        },
      }}
    >
      {groups.map((group, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {group.map((ingredient, idx) => (
            <Box
              key={ingredient.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 1,
                margin: "0 8px",
                minWidth: "120px",
              }}
            >
              <Box
                component="img"
                src={ingredientImageUrls[index * visibleItems + idx]}
                alt="Зображення інгредієнта"
                sx={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <Typography variant="body1" marginTop="4px">
                {ingredient.title}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Carousel>
  );
};

export default IngredientImageCarousel;
