import "./AboutUsPage.css";
import type { FC } from "react";
import { Container, Paper, Typography } from "@mui/material";

const AboutUsPage: FC = () => {
  return (
    <section className="about-us">
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: { xs: "0.75rem", sm: "2rem" },
        }}
      >
        <Paper
          sx={{
            maxWidth: { sm: "800px", xxl: "1000px" },
            color: "#ffffff",
            textAlign: "justify",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: { xs: "0.75rem", sm: "2rem" },
            borderRadius: "20px",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: "1.75rem", sm: "2.125rem", xxl: "3rem" },
              marginBottom: { xxl: 6 },
            }}
          >
            Про нас
          </Typography>
          <Typography
            paragraph
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem", xxl: "1.5rem" },
              marginBottom: { xxl: 4 },
            }}
          >
            Ласкаво просимо до SakuraCafe! Затишний куточок, для справжніх
            японських кулінарних шедеврів, розташованого в самому серці Токіо.
            Ми запрошуємо вас у гастрономічну подорож через багаті смаки та
            традиції Японії.
          </Typography>
          <Typography
            paragraph
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem", xxl: "1.5rem" },
              marginBottom: { xxl: 4 },
            }}
          >
            Наша пристрасть до японської кухні виходить за рамки буденності,
            оскільки ми ретельно готуємо кожну страву з точністю та турботою.
            Від автентичного мистецтва суші до заспокійливого тепла рамену,
            кожен шматочок розповідає історію, занурену в традиції та спадщину.
          </Typography>
          <Typography
            paragraph
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem", xxl: "1.5rem" },
              marginBottom: { xxl: 4 },
            }}
          >
            Завітайте до нашого безтурботного оазису, де аромат свіжозавареної
            матча та ніжний шепіт квітучої сакури викликає відчуття спокою та
            гармонії. Незалежно від того, чи шукаєте ви швидкий перекус або
            неспішну вечерю, SakuraCafe вітає вас з розпростертими обіймами.
          </Typography>
          <Typography
            paragraph
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem", xxl: "1.5rem" },
              marginBottom: { xxl: 4 },
            }}
          >
            Як прихильники якості та автентичності, ми використовуємо лише
            найкращі інгредієнти, гарантуючи, що кожна страва є шедевром смаку
            та свіжості. Наше прагнення до досконалості виходить за межі кухні,
            оскільки наш уважний персонал прагне забезпечити бездоганний сервіс
            та справжню гостинність.
          </Typography>
          <Typography
            paragraph
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem", xxl: "1.5rem" },
            }}
          >
            Пориньте у вишукані смаки Японії у SakuraCafe, де кожна трапеза – це
            свято культури, пристрасті та кулінарного мистецтва.
          </Typography>
        </Paper>
      </Container>
    </section>
  );
};

export default AboutUsPage;
