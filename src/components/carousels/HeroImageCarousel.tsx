import type { FC } from "react";
import { Box } from "@mui/material";

interface CarouselImageItemProps {
  carouselItem: string;
}

const HeroImageCarousel: FC<CarouselImageItemProps> = ({ carouselItem }) => {
  return (
    <Box
      component="img"
      src={`/images/carousel/${carouselItem}`}
      alt="Карусельне зображення"
      className="w-full max-lg:h-[400px]"
    />
  );
};

export default HeroImageCarousel;
