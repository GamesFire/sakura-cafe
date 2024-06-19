import type { FC } from "react";
import { Box } from "@mui/material";

interface HeroImageCarouselItemProps {
  heroImageCarouselItem: string;
}

const HeroImageCarousel: FC<HeroImageCarouselItemProps> = ({
  heroImageCarouselItem,
}) => {
  return (
    <Box
      component="img"
      src={`/images/carousel/${heroImageCarouselItem}`}
      alt="Карусельне зображення"
      className="w-full max-lg:h-[400px]"
    />
  );
};

export default HeroImageCarousel;
