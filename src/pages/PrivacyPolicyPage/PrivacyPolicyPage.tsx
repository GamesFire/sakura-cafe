import type { FC } from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const PrivacyPolicyPage: FC = () => {
  return (
    <Container sx={{ my: 4 }}>
      <Typography
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: "1.75rem", sm: "2.125rem", xxl: "3rem" },
          marginBottom: { xxl: 4 },
        }}
      >
        Політика конфіденційності
      </Typography>
      <Typography variant="body1" paragraph>
        Ваша конфіденційність важлива для нас. Ми прагнемо забезпечити захист
        Ваших особистих даних і бути прозорими щодо того, як ми їх
        використовуємо. Ця політика конфіденційності описує, як SakuraCafe
        ("ми", "наш", "нас") збирає, використовує і захищає Вашу інформацію під
        час користуванням нашим вебсайтом.
      </Typography>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          1. Збір інформації
        </Typography>
        <Typography variant="body1" paragraph>
          Ми збираємо особисту інформацію, яку Ви надаєте нам під час реєстрації
          на сайті, розміщення замовлень або взаємодії з нами. Це може включати:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Ім'я." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Адреса електронної пошти." />
          </ListItem>
        </List>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          2. Використання інформації
        </Typography>
        <Typography variant="body1" paragraph>
          Ми використовуємо Вашу інформацію для:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Обробки та виконання Ваших замовлень." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Підтвердження вашої реєстрації та управління Вашим обліковим записом." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Відповідей на Ваші запити та надання підтримки." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Поліпшення нашого сайту та обслуговування." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Відправки Вам маркетингових матеріалів (за вашою згодою)." />
          </ListItem>
        </List>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          3. Захист інформації
        </Typography>
        <Typography variant="body1" paragraph>
          Ми використовуємо сучасні технології захисту, включаючи шифрування та
          токенізацію, для запобігання несанкціонованому доступу до Вашої
          інформації. Ваші дані зберігаються на захищених серверах з обмеженим
          доступом.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          4. Поділ інформації з третіми сторонами
        </Typography>
        <Typography variant="body1" paragraph>
          Ми не передаємо Вашу особисту інформацію третім сторонам, за винятком
          випадків, коли це необхідно, наприклад, коли цього вимагає закон.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          5. Використання файлів cookie
        </Typography>
        <Typography variant="body1" paragraph>
          Ми використовуємо файли cookie для поліпшення Вашого досвіду на нашому
          сайті. Cookie допомагають нам запам'ятовувати Ваші налаштування та
          відстежувати, як Ви користуєтесь сайтом, щоб ми могли надавати Вам
          персоналізовані послуги. Ви можете керувати налаштуваннями файлів
          cookie у своєму браузері.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          6. Ваші права
        </Typography>
        <Typography variant="body1" paragraph>
          Ви маєте право отримувати доступ до Вашої особистої інформації,
          виправляти її або вимагати її видалення. Якщо у Вас є питання або Ви
          хочете скористатися своїми правами, будь ласка, зв'яжіться з нами
          через контактну інформацію, зазначену на нашому сайті.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          7. Зміни до політики конфіденційності
        </Typography>
        <Typography variant="body1" paragraph>
          Ми можемо періодично оновлювати цю політику конфіденційності. Будь-які
          зміни будуть опубліковані на цій сторінці, тому рекомендуємо регулярно
          переглядати її, щоб бути в курсі того, як ми захищаємо вашу
          інформацію.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          8. Контактна інформація
        </Typography>
        <Typography variant="body1" paragraph>
          Якщо у Вас є питання або зауваження щодо нашої політики
          конфіденційності, будь ласка, зв'яжіться з нами за допомогою
          контактної інформації, зазначеної на нашому сайті.
        </Typography>
      </Box>

      <Typography variant="body1" paragraph align="center">
        Дякуємо за довіру до SakuraCafe! Ми цінуємо Вашу конфіденційність і
        докладаємо всіх зусиль, щоб захистити Вашу особисту інформацію.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicyPage;
