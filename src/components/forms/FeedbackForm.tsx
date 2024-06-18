import { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useCreateFeedbackMutation } from "@/services/feedback";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { CreateFeedbackRequest } from "@/store/models/request/CreateFeedbackRequest";
import useNotification from "@/hooks/useNotification";

const FeedbackForm: FC = () => {
  const { control, handleSubmit, watch, reset } =
    useForm<CreateFeedbackRequest>();
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();
  const { showNotification, NotificationComponent } = useNotification();
  const [messageLength, setMessageLength] = useState(0);
  watch("message", "");

  const onSubmit = async (data: CreateFeedbackRequest) => {
    try {
      await createFeedback(data).unwrap();
      reset();
      showNotification(
        "Ваше повідомлення було успішно відправлено. Відповідь можна буде очікувати на електронній пошті, яка була вказана при створенні облікового запису.",
        "success"
      );
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        showNotification(
          "Будь ласка, зареєструйтеся або увійдіть у свій обліковий запис, щоб відправити повідомлення.",
          "error"
        );
      } else if (error?.data && Array.isArray(error.data)) {
        error.data.forEach((errorMessage: string) => {
          showNotification(`${errorMessage.split(" - ").at(-1)}`, "error");
        });
      } else {
        showNotification(
          "Виникла помилка при відправці повідомлення. Спробуйте ще раз.",
          "error"
        );
      }
    }
  };

  return (
    <Paper sx={{ height: "100%", padding: "1rem", backgroundColor: "#FFFFFF" }}>
      <Typography
        component="p"
        align="center"
        marginBottom={4}
        sx={{
          fontSize: { xs: "0.875rem", sm: "1rem", xxl: "1.125rem" },
        }}
      >
        Будь ласка, використовуйте форму нижче, щоб поділитися з нами своїми
        думками, пропозиціями або запитаннями. Ми будемо вдячні за ваші відгуки
        і відповімо на ваше повідомлення якомога швидше.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="subject"
          control={control}
          defaultValue=""
          rules={{ required: "Тема повідомлення обов'язкова" }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              autoComplete="off"
              required
              margin="dense"
              id="subject"
              name="subject"
              label="Тема повідомлення"
              type="text"
              fullWidth
              variant="filled"
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Controller
          name="message"
          control={control}
          defaultValue=""
          rules={{
            required: "Повідомлення обов'язкове",
            maxLength: {
              value: 1000,
              message: "Повідомлення не повинно перевищувати 1000 символів",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextField
                {...field}
                autoComplete="off"
                required
                margin="dense"
                id="message"
                name="message"
                label="Повідомлення"
                multiline
                fullWidth
                variant="filled"
                rows={8}
                error={!!error}
                helperText={error ? error.message : null}
                onChange={(e) => {
                  field.onChange(e);
                  setMessageLength(e.target.value.length);
                }}
              />
              <Typography
                component="p"
                variant="body2"
                align="right"
                color={messageLength > 1000 ? "error" : "textSecondary"}
              >
                {messageLength}/1000
              </Typography>
            </>
          )}
        />
        <Box textAlign="right" marginTop={4}>
          <Button
            className="btn"
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            Відправити
          </Button>
        </Box>
      </form>
      {NotificationComponent}
    </Paper>
  );
};

export default FeedbackForm;
