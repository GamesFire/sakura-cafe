import { type FC } from "react";
import {
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
  Box,
  Link,
} from "@mui/material";
import { useLoginMutation } from "@/services/authentication";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/store/slices/authenticationSlice";
import { CookieManager } from "@/utils/CookieManager";

interface LoginFormProps {
  onToggleForm: () => void;
  onClose: () => void;
  onErrors: (error: any) => void;
  errorMessages: string[];
  setErrorMessages: (errors: string[]) => void;
}

const LoginForm: FC<LoginFormProps> = ({
  onToggleForm,
  onClose,
  onErrors,
  errorMessages,
  setErrorMessages,
}) => {
  const [login, { isLoading: isLoadingLogin }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessages([]);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await login({ email, password }).unwrap();

      CookieManager.setAccessToken(response.accessToken);
      dispatch(setCredentials(CookieManager.getUserInfoFromAccessToken()));

      onClose();
    } catch (err) {
      onErrors(err);
    }
  };

  return (
    <>
      <DialogContent
      >
        <DialogContentText>
          Щоб увійти в уже раніше створений свій обліковий запис, будь ласка,
          заповніть поля нижче:
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            autoComplete="off"
            required
            margin="dense"
            id="email"
            name="email"
            label="Адреса електронної пошти"
            type="email"
            fullWidth
            variant="filled"
          />
          <TextField
            autoComplete="off"
            required
            margin="dense"
            id="password"
            name="password"
            label="Пароль"
            type="password"
            fullWidth
            variant="filled"
          />
          {errorMessages.length > 0 && (
            <Box my={2}>
              {errorMessages.map((error, index) => (
                <Alert
                  key={index}
                  severity="error"
                  variant="outlined"
                  sx={{ marginBottom: "1rem" }}
                >
                  {error}
                </Alert>
              ))}
            </Box>
          )}
          <DialogActions sx={{ padding: 0, paddingTop: "1rem" }}>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{ marginRight: "0.5rem" }}
            >
              Скасувати
            </Button>
            <Button
              className="btn"
              type="submit"
              variant="contained"
              disabled={isLoadingLogin}
            >
              {isLoadingLogin ? (
                <CircularProgress size={24} sx={{ color: "#77374F" }} />
              ) : (
                "Вхід"
              )}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      <DialogContentText align="center" sx={{ padding: "1rem" }}>
        Немає акаунта? <Link onClick={onToggleForm}>Зареєструватися</Link>
      </DialogContentText>
    </>
  );
};

export default LoginForm;
