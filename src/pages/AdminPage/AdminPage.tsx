import { type FC, useState } from "react";
import { Typography, useMediaQuery, useTheme, Box } from "@mui/material";
import Sidebar from "@/components/admin/Sidebar";
import MainContent from "@/components/admin/MainContent";

const AdminPage: FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (isSmallScreen) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
        padding="16px"
      >
        <Typography variant="h6">
          Адмінпанель недоступна на планшетах і телефонах. Будь ласка,
          використовуйте пристрій з більш великим екраном.
        </Typography>
      </Box>
    );
  }

  return (
    <section className="flex">
      <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      <MainContent selectedItem={selectedItem} />
    </section>
  );
};

export default AdminPage;
