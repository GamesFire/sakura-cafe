import { useState, type FC } from "react";
import { Alert, Box, CircularProgress } from "@mui/material";
import { useAppSelector } from "@/hooks/redux";
import type { RootState } from "@/store/store";
import { skipToken } from "@reduxjs/toolkit/query/react";
import Category from "@/components/category/Category";
import SearchInput from "@/components/searchInput/SearchInput";
import SortSelect from "@/components/sortSelect/SortSelect";
import FoodItem from "@/components/food/FoodItem";
import { useGetFoodsByCategoryNameQuery } from "@/services/food";
import { filterFoodsBySearchTerm } from "@/utils/filterFoodsBySearchTerm";
import { sortFoods } from "@/utils/sortFoods";

const MenuPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");

  const activeCategory = useAppSelector(
    (state: RootState) => state.categorySlice.activeCategory
  );

  const encodedCategoryName = activeCategory
    ? encodeURIComponent(activeCategory.name)
    : "";

  const {
    data: foods,
    isLoading,
    isFetching,
    error,
  } = useGetFoodsByCategoryNameQuery(
    activeCategory ? encodedCategoryName : skipToken
  );

  const filteredFoods = filterFoodsBySearchTerm(foods, searchTerm);
  const sortedFoods = sortFoods(filteredFoods, sortOption);
  const noFoodsError =
    !isLoading &&
    !isFetching &&
    !error &&
    (!sortedFoods || sortedFoods.length === 0);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Category />
      <Box className="w-full flex max-md:justify-start justify-between max-md:items-start items-center max-lg:flex-col p-2 mt-4">
        <SearchInput value={searchTerm} onChange={handleSearchChange} />
        <SortSelect value={sortOption} onChange={handleSortChange} />
      </Box>
      <Box width="100%" flexGrow={1} marginTop={2} marginBottom={8}>
        {(isLoading || isFetching) && (
          <Box sx={{ textAlign: "center", marginBlock: 16 }}>
            <CircularProgress size={100} sx={{ color: "#77374F" }} />
          </Box>
        )}
        {error && (
          <Alert
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "80%", sm: "30%" },
              fontSize: "16px",
              textAlign: "center",
              marginInline: "auto",
              marginBlock: 16,
            }}
            severity="error"
            variant="outlined"
          >
            Помилка завантаження їжі
          </Alert>
        )}
        {noFoodsError && (
          <Alert
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "80%", sm: "30%" },
              fontSize: "16px",
              textAlign: "center",
              marginInline: "auto",
              marginBlock: 16,
            }}
            severity="error"
            variant="outlined"
          >
            Немає доступної їжі
          </Alert>
        )}
        {!isLoading && !isFetching && sortedFoods && sortedFoods.length > 0 && (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 460px))"
            justifyContent="center"
            alignItems="center"
            gap={6}
          >
            {sortedFoods.map((food) => (
              <Box key={food.name}>
                <FoodItem food={food} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MenuPage;
