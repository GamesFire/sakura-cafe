import { type FC, useEffect, useState } from "react";
import "./HomePage.css";
import { loadHeroImagesCarousel } from "@/utils/loadHeroImagesCarousel";
import Carousel from "react-material-ui-carousel";
import HeroImageCarousel from "@/components/carousels/HeroImageCarousel";
import { Box, Typography } from "@mui/material";
import MostPopularFood from "@/components/food/MostPopularFood";

const HomePage: FC = () => {
  const [heroImageCarouselItems, setHeroImageCarouselItems] = useState<
    string[]
  >([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    try {
      const heroImages = loadHeroImagesCarousel();
      setHeroImageCarouselItems(heroImages);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  }, []);

  return (
    <>
      <section className="carousel-container">
        {error ? (
          <div className="fallback-background">
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
          </div>
        ) : (
          <>
            <Carousel
              className="6xl:h-[800px] max-lg:h-[400px] h-[500px]"
              indicators={false}
              navButtonsAlwaysInvisible={true}
              stopAutoPlayOnHover={false}
              interval={10000}
              duration={800}
            >
              {heroImageCarouselItems.map(
                (heroImageCarouselItem, heroImageCarouselIndex) => (
                  <HeroImageCarousel
                    key={heroImageCarouselIndex}
                    heroImageCarouselItem={heroImageCarouselItem}
                  />
                )
              )}
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
          </>
        )}
      </section>
      <MostPopularFood />
    </>
  );
};

export default HomePage;
