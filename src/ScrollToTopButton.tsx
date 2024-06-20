import { useState, useEffect, type FC } from "react";
import { IconButton } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";

const ScrollToTopButton: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: "50",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#fff",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ArrowUpward />
        </IconButton>
      )}
    </>
  );
};

export default ScrollToTopButton;
