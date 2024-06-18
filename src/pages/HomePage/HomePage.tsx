import { FC, useEffect, useState } from "react";
import "./HomePage.css";
import { loadCarouselImages } from "@/utils/loadCarouselImages";
import Carousel from "react-material-ui-carousel";
import HeroImageCarousel from "@/components/carousels/HeroImageCarousel";
import { Box, Typography } from "@mui/material";
import MostPopularFood from "@/components/food/MostPopularFood";

const HomePage: FC = () => {
  const [carouselItems, setCarouselItems] = useState<string[]>([]);

  useEffect(() => {
    const images = loadCarouselImages();

    setCarouselItems(images);
  }, []);

  return (
    <>
      <section className="carousel-container">
        <Carousel
          className="6xl:h-[800px] max-lg:h-[400px] h-[500px]"
          indicators={false}
          navButtonsAlwaysInvisible={true}
          stopAutoPlayOnHover={false}
          interval={10000}
          duration={800}
        >
          {carouselItems.map((carouselItem, carouselIndex) => (
            <HeroImageCarousel
              key={carouselIndex}
              carouselItem={carouselItem}
            />
          ))}
        </Carousel>
        <div className="overlay"></div>
        <Box className="hero-text">
          <Typography
            component="div"
            className="font-bold"
            sx={{
              fontSize: { xs: "2rem", sm: "3rem", xxl: "4.5rem" },
            }}
          >
            Там, де аромат цвіте, як сакура
          </Typography> 
        </Box>
      </section>
      <MostPopularFood />
    </>
  );
};

export default HomePage;
