import "./App.css";
import { type FC, useEffect } from "react";
import Header from "@components/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import { ThemeProvider } from "@emotion/react";
import { CircularProgress } from "@mui/material";
import { useAuthenticationHandler } from "./hooks/useAuthenticationHandler";
import { useHandleAddFoodsToTray } from "./hooks/useAddFoodsToTrayHandler";
import ScrollToTop from "./ScrollToTop";
import { THEME } from "./constants/theme";
import ScrollToTopButton from "./ScrollToTopButton";

const App: FC = () => {
  const { isLoading } = useAuthenticationHandler();
  const handleAddFoodsToTray = useHandleAddFoodsToTray();

  useEffect(() => {
    const handleBeforeUnload = () => {
      handleAddFoodsToTray();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [handleAddFoodsToTray]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress
          size={80}
          sx={{
            color: "#77374F",
          }}
        />
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <ThemeProvider theme={THEME}>
        <Header />
        <main className="6xl:h-screen">
          <Outlet />
        </main>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
