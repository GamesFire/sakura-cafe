import type { FC } from "react";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";

interface SidebarProps {
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ selectedItem, setSelectedItem }) => {
  return (
    <div className="w-60 min-h-screen bg-btn-color text-black text-lg">
      <List>
        <ListItem disablePadding className="hover:bg-btn-active">
          <ListItemButton
            onClick={() => setSelectedItem("users")}
            selected={selectedItem === "users"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#F4929F",
                ":hover": {
                  backgroundColor: "unset",
                },
              },
            }}
          >
            <ListItemText primary="Користувачі" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="hover:bg-btn-active">
          <ListItemButton
            onClick={() => setSelectedItem("categories")}
            selected={selectedItem === "categories"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#F4929F",
                ":hover": {
                  backgroundColor: "unset",
                },
              },
            }}
          >
            <ListItemText primary="Категорії" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="hover:bg-btn-active">
          <ListItemButton
            onClick={() => setSelectedItem("foods")}
            selected={selectedItem === "foods"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#F4929F",
                ":hover": {
                  backgroundColor: "unset",
                },
              },
            }}
          >
            <ListItemText primary="Їжа" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="hover:bg-btn-active">
          <ListItemButton
            onClick={() => setSelectedItem("ingredients")}
            selected={selectedItem === "ingredients"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#F4929F",
                ":hover": {
                  backgroundColor: "unset",
                },
              },
            }}
          >
            <ListItemText primary="Інгредієнти" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="hover:bg-btn-active">
          <ListItemButton
            onClick={() => setSelectedItem("orders")}
            selected={selectedItem === "orders"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#F4929F",
                ":hover": {
                  backgroundColor: "unset",
                },
              },
            }}
          >
            <ListItemText primary="Замовлення" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="hover:bg-btn-active">
          <ListItemButton
            onClick={() => setSelectedItem("feedbacks")}
            selected={selectedItem === "feedbacks"}
            sx={{
              "&.Mui-selected": {
                backgroundColor: "#F4929F",
                ":hover": {
                  backgroundColor: "unset",
                },
              },
            }}
          >
            <ListItemText primary="Зворотні зв'язки" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
