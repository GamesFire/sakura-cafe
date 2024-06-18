import { type FC } from "react";
import { Container, Typography, Box } from "@mui/material";

const TermsAndConditionsPage: FC = () => {
  return (
    <Container sx={{ my: 4 }}>
      <Typography
        gutterBottom
        align="center"
        sx={{
          fontSize: { xs: "1.75rem", sm: "2.125rem", xxl: "3rem" },
          marginBottom: { xxl: 4 },
        }}
      >
        Умови та положення
      </Typography>
      <Typography variant="body1" paragraph>
        Ласкаво просимо на сайт SakuraCafe. Використовуючи наш вебсайт, Ви
        погоджуєтесь дотримуватись наступних умов. Будь ласка, уважно
        ознайомтесь з ними перед використанням нашого сайту.
      </Typography>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          1. Прийняття умов
        </Typography>
        <Typography variant="body1" paragraph>
          Використовуючи цей сайт, Ви погоджуєтесь дотримуватись цих умов
          використання. Якщо Ви не погоджуєтесь з цими умовами, будь ласка, не
          використовуйте наш вебсайт.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          2. Реєстрація облікового запису
        </Typography>
        <Typography variant="body1" paragraph>
          Для використання деяких функцій нашого сайту Вам може знадобитись
          зареєструватись та створити обліковий запис. Ви погоджуєтесь надавати
          правдиву, точну та актуальну інформацію під час реєстрації.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          3. Використання сайту
        </Typography>
        <Typography variant="body1" paragraph>
          Ви погоджуєтесь використовувати наш сайт лише в законних цілях і не
          порушувати права інших користувачів. Заборонено розміщувати на сайті
          будь-які матеріали, що є незаконними, шкідливими, образливими або
          непристойними.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          4. Конфіденційність
        </Typography>
        <Typography variant="body1" paragraph>
          Ваша конфіденційність є важливою для нас. Будь ласка, ознайомтесь з
          нашою Політикою конфіденційності, щоб дізнатись, як ми збираємо,
          використовуємо та захищаємо Вашу особисту інформацію.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          5. Замовлення
        </Typography>
        <Typography variant="body1" paragraph>
          Ви можете робити замовлення через наш сайт після реєстрації. Всі
          замовлення підлягають підтвердженню, і ми залишаємо за собою право
          відмовити в обробці будь-якого замовлення з будь-якої причини.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          6. Інтелектуальна власність
        </Typography>
        <Typography variant="body1" paragraph>
          Всі матеріали, розміщені на цьому сайті(окрім, зображень їжі та
          інгредієнтів), включаючи текст, логотипи, дизайн та інші елементи, є
          власністю SakuraCafe та захищені законами про авторське право та інші
          закони про інтелектуальну власність.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          7. Зміни до умов
        </Typography>
        <Typography variant="body1" paragraph>
          Ми залишаємо за собою право вносити зміни до цих умов у будь-який час.
          Будь-які зміни набувають чинності негайно після їх публікації на цій
          сторінці. Ми рекомендуємо регулярно переглядати ці умови, щоб бути в
          курсі змін.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          8. Відповідальність
        </Typography>
        <Typography variant="body1" paragraph>
          SakuraCafe не несе відповідальності за будь-які прямі або непрямі
          збитки, що виникають внаслідок використання або неможливості
          використання нашого сайту. Ми також не несемо відповідальності за
          зміст сайтів, на які можуть посилатися наші посилання.
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          9. Контактна інформація
        </Typography>
        <Typography variant="body1" paragraph>
          Якщо у Вас є будь-які питання або зауваження щодо цих умов, будь
          ласка, зв'яжіться з нами за допомогою контактної інформації,
          зазначеної на нашому сайті.
        </Typography>
      </Box>

      <Typography variant="body1" paragraph align="center">
        Дякуємо за користування SakuraCafe! Ми прагнемо забезпечити Вам
        найкращий сервіс та сподіваємось на довготривалу співпрацю.
      </Typography>
    </Container>
  );
};

export default TermsAndConditionsPage;
