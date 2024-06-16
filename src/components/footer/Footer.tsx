import type { FC } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { RoutePaths } from "@/constants/RoutePaths";

const Footer: FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#7F3D57",
        color: "white",
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              textAlign: { xs: "center", sm: "left" },
              a: {
                display: "block",
                color: "inherit",
                ":first-of-type": {
                  marginBottom: { sm: "20px" },
                },
                marginBottom: { xs: "12px" },
              },
              "a:hover": {
                color: "#FDB3BD",
                textDecorationLine: "underline",
                textDecorationColor: "#FDB3BD",
                textUnderlineOffset: "0.2rem",
              },
            }}
          >
            <Box
              sx={{
                marginRight: { xs: "0", sm: "72px" },
              }}
            >
              <Link to={RoutePaths.HOME_PAGE}>Головна</Link>
              <Link to={RoutePaths.MENU_PAGE}>Меню</Link>
            </Box>
            <Box
              sx={{
                marginRight: { xs: "0", sm: "72px" },
              }}
            >
              <Link to={RoutePaths.ABOUT_US_PAGE}>Про нас</Link>
              <Link to={RoutePaths.CONTACT_PAGE}>Контакти</Link>
            </Box>
            <Box>
              <Link to={RoutePaths.PRIVACY_POLICY_PAGE}>
                Політика конфіденційності
              </Link>
              <Link to={RoutePaths.TERMS_AND_CONDITIONS_PAGE}>
                Умови та положення
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              textAlign: { xs: "center", sm: "left" },
              marginBlock: { xs: "20px", sm: "0" },
            }}
          >
            <Typography variant="body1" gutterBottom>
              Години роботи:
            </Typography>
            <Typography variant="body2">
              Понеділок - четвер: 10:00 - 21:00
            </Typography>
            <Typography variant="body2">
              П'ятниця - неділя: 10:00 - 22:00
            </Typography>
          </Box>
        </Box>
        <Box mt={3} textAlign="center">
          <Typography
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            © 2024 SakuraCafe - Всі права захищені
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
