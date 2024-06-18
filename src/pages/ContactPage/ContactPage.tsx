import type { FC } from "react";
import { Box, Typography, Grid, Container, Link } from "@mui/material";
import Map from "@/components/map/Map";
import FeedbackForm from "@/components/forms/FeedbackForm";

const ContactPage: FC = () => {
  return (
    <Container>
      <Box component="section" sx={{ marginBlock: { xs: "2rem", sm: "4rem" } }}>
        <Typography
          component="h2"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.125rem", xxl: "3rem" },
          }}
        >
          Дякуємо за інтерес до SakuraCafe!
        </Typography>
        <Typography component="p" variant="body1" align="center" gutterBottom>
          Ми цінуємо ваші відгуки і завжди готові допомогти вам.
        </Typography>
      </Box>
      <section>
        <Grid container spacing={8} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Map />
          </Grid>
          <Grid item xs={12} md={6}>
            <FeedbackForm />
          </Grid>
        </Grid>
      </section>
      <Box component="section" marginTop={12} marginBottom={8}>
        <Typography
          component="h3"
          align="center"
          marginBottom={6}
          sx={{
            fontSize: { xs: "1.75rem", sm: "2.125rem", xxl: "3rem" },
          }}
        >
          Зв’язатися з нами
        </Typography>
        <Box
          alignItems="center"
          sx={{
            display: "flex",
            justifyContent: { xs: "flex-start", sm: "space-around" },
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            a: {
              color: "#000000",
              textDecoration: "none",
            },
            "a:hover": {
              textDecorationLine: "underline",
              textDecorationColor: "#000000",
              textUnderlineOffset: "0.25rem",
            },
          }}
        >
          <Box>
            <Typography component="p" variant="body1" paragraph>
              <span className="font-bold">Телефон:</span>{" "}
              <Link href="tel:+811234567890">+81 123-456-7890</Link>
            </Typography>
            <Typography component="p" variant="body1" paragraph>
              <span className="font-bold">Місцезнаходження:</span>
              <br />
              1-chōme-6-6 Shibuya, Shibuya City,
              <br />
              Tokyo 150-0002, Japan 123
            </Typography>
          </Box>
          <Box>
            <Typography component="p" variant="body1" paragraph>
              <span className="font-bold">Електронна пошта:</span>{" "}
              <Link href="mailto:info@sakuracafe.jp">info@sakuracafe.jp</Link>
            </Typography>
            <Typography component="p" variant="body1" paragraph>
              <span className="font-bold">Години роботи:</span>
              <br />
              Понеділок - четвер: 10:00 - 21:00
              <br />
              П'ятниця - неділя: 10:00 - 22:00
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ContactPage;
