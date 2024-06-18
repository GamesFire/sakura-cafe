import { useState, useEffect, type FC } from "react";
import type { RootState } from "@/store/store";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGetCategoriesQuery } from "@/services/category";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Alert,
  LinearProgress,
  Collapse,
  Button,
} from "@mui/material";
import { setCategories, setActiveCategory } from "@/store/slices/categorySlice";
import { ICategory } from "@/store/models/ICategory";
import { useNavigate, useParams } from "react-router-dom";
import NavigationManager from "@/utils/NavigationManager";

const Category: FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { categories } = useAppSelector(
    (state: RootState) => state.categorySlice
  );
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetCategoriesQuery();
  const { categoryName } = useParams<{ categoryName?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch(setCategories(data));
      const activeCat = data.find((cat) => cat.name === categoryName);
      if (activeCat) {
        dispatch(setActiveCategory(activeCat));
      } else {
        const defaultCat = data[0];
        dispatch(setActiveCategory(defaultCat));
        NavigationManager.navigateToMenuCategory(navigate, defaultCat.name);
      }
    }
  }, [data, categoryName, dispatch, navigate]);

  const handleCategoryClick = (category: ICategory) => {
    NavigationManager.navigateToMenuCategory(navigate, category.name);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  if (isLoading) {
    return (
      <Box sx={{ width: "90%", marginBlock: 4 }}>
        <LinearProgress color="inherit" />
      </Box>
    );
  }

  if (error || !categories.length) {
    return (
      <Alert sx={{ marginTop: 4 }} severity="error" variant="outlined">
        Помилка завантаження категорій
      </Alert>
    );
  }

  const activeCategory =
    categories.find((cat) => cat.name === categoryName) || categories[0];

  return (
    <>
      <Typography
        component="h4"
        sx={{
          fontSize: { xs: "1.75rem", sm: "2.125rem", xxl: "3rem" },
          marginTop: { sm: 2, xxl: 6 },
          marginBottom: { xxl: 4 },
        }}
      >
        Категорії
      </Typography>
      <Box width="100%" borderTop="2px solid #77374F">
        <Button
          variant="contained"
          color="primary"
          sx={{
            display: { xs: "block", sm: "none" },
            marginTop: { sm: 2, xxl: 6 },
            width: "100%",
          }}
          onClick={toggleDropdown}
        >
          {dropdownOpen ? "Сховати категорії" : "Показати категорії"}
        </Button>
        <Collapse in={dropdownOpen} timeout="auto" unmountOnExit>
          <List sx={{ display: { xs: "block", sm: "flex" } }}>
            {categories.map((category) => (
              <ListItem
                key={category.id}
                sx={{
                  ":hover": {
                    backgroundColor:
                      activeCategory.id !== category.id
                        ? "rgba(244, 146, 159, 0.5)"
                        : "rgb(244, 146, 159)",
                    transition: "background-color 0.3s ease-in-out",
                  },
                  "& .MuiButtonBase-root.Mui-selected": {
                    backgroundColor: "rgb(244, 146, 159)",
                  },
                  "& .MuiButtonBase-root.Mui-selected:hover": {
                    backgroundColor: "rgb(244, 146, 159)",
                  },
                }}
                disablePadding
              >
                <ListItemButton
                  selected={activeCategory.id === category.id}
                  onClick={() => handleCategoryClick(category)}
                >
                  <ListItemText
                    primary={category.name}
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
        <List sx={{ display: { xs: "none", sm: "flex" } }}>
          {categories.map((category) => (
            <ListItem
              key={category.id}
              sx={{
                ":hover": {
                  backgroundColor:
                    activeCategory.id !== category.id
                      ? "rgba(244, 146, 159, 0.5)"
                      : "rgb(244, 146, 159)",
                  transition: "background-color 0.3s ease-in-out",
                },
                "& .MuiButtonBase-root.Mui-selected": {
                  backgroundColor: "rgb(244, 146, 159)",
                },
                "& .MuiButtonBase-root.Mui-selected:hover": {
                  backgroundColor: "rgb(244, 146, 159)",
                },
              }}
              disablePadding
            >
              <ListItemButton
                selected={activeCategory.id === category.id}
                onClick={() => handleCategoryClick(category)}
              >
                <ListItemText
                  primary={category.name}
                  sx={{ textAlign: "center" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Category;
