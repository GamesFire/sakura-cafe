import { useState, type FC } from "react";
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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useRegistrationMutation } from "@/services/authentication";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/store/slices/authenticationSlice";
import { CookieManager } from "@/utils/CookieManager";
import { RoutePaths } from "@/constants/RoutePaths";

interface RegistrationFormProps {
  onToggleForm: () => void;
  onClose: () => void;
  onErrors: (error: any) => void;
  errorMessages: string[];
  setErrorMessages: (errors: string[]) => void;
}

const RegistrationForm: FC<RegistrationFormProps> = ({
  onToggleForm,
  onClose,
  onErrors,
  errorMessages,
  setErrorMessages,
}) => {
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [registration, { isLoading: isLoadingRegistration }] =
    useRegistrationMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessages([]);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setErrorMessages(["Паролі не збігаються"]);
      return;
    }

    if (!acceptTerms) {
      setErrorMessages([
        "Ви повинні прийняти Політику конфіденційності і Умови та положення",
      ]);
      return;
    }

    try {
      const response = await registration({ name, email, password }).unwrap();

      CookieManager.setAccessToken(response.accessToken);
      dispatch(setCredentials(CookieManager.getUserInfoFromAccessToken()));
    } catch (err) {
      onErrors(err);
    }
  };

  return (
    <>
      <DialogContent>
        <DialogContentText>
          Щоб створити новий обліковий запис, будь ласка, заповніть поля нижче:
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            autoComplete="off"
            required
            margin="dense"
            id="name"
            name="name"
            label="Ім'я"
            type="text"
            fullWidth
            variant="filled"
          />
          <TextField
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
          <TextField
            autoComplete="off"
            required
            margin="dense"
            id="confirmPassword"
            name="confirmPassword"
            label="Підтвердити пароль"
            type="password"
            fullWidth
            variant="filled"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                name="acceptTerms"
                color="primary"
                sx={{
                  "&.Mui-checked .MuiSvgIcon-root": {
                    color: "#F4929F",
                  },
                }}
              />
            }
            label={
              <span className="text-sm">
                Я приймаю{" "}
                <Link
                  href={RoutePaths.PRIVACY_POLICY_PAGE}
                  target="_blank"
                  rel="noopener"
                >
                  Політику конфіденційності
                </Link>{" "}
                і{" "}
                <Link
                  href={RoutePaths.TERMS_AND_CONDITIONS_PAGE}
                  target="_blank"
                  rel="noopener"
                >
                  Умови та положення
                </Link>
              </span>
            }
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
          <DialogActions
            sx={{
              padding: 0,
              paddingTop: "1rem",
              alignItems: { xs: "flex-end", sm: "center" },
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                marginRight: { xs: "0", sm: "0.5rem" },
                marginBottom: { xs: "0.5rem", sm: "0" },
              }}
            >
              Скасувати
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoadingRegistration}
            >
              {isLoadingRegistration ? (
                <CircularProgress size={24} sx={{ color: "#77374F" }} />
              ) : (
                "Зареєструватися"
              )}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      <DialogContentText align="center" sx={{ padding: "1rem" }}>
        Є акаунт? <Link onClick={onToggleForm}>Вхід</Link>
      </DialogContentText>
    </>
  );
};

export default RegistrationForm;
