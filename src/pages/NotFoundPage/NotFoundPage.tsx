import type { FC } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
      bgcolor="#f8f9fa"
      padding={4}
      sx={{
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <Typography
        variant="h1"
        fontFamily="inherit"
        component="div"
        color="#000000"
        gutterBottom
      >
        404
      </Typography>
      <Typography
        variant="h4"
        fontFamily="inherit"
        color="#000000"
        gutterBottom
      >
        Ой! Сторінку не знайдено.
      </Typography>
      <Typography
        variant="body1"
        fontFamily="inherit"
        color="#000000"
        paragraph
      >
        Вибачте, але ми не змогли знайти сторінку, яку ви шукали.
      </Typography>
      <Button
        className="btn"
        sx={{
          color: "#000000",
          backgroundColor: "#FDB3BD",
          paddingBlock: "16px",
          paddingInline: "32px",
          borderRadius: "16px",
          ":hover": {
            backgroundColor: "#F4929F",
          },
        }}
        onClick={handleGoHome}
      >
        Повернутися на головну
      </Button>
    </Box>
  );
};

export default NotFoundPage;
