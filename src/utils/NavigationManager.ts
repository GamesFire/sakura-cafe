import { NavigateFunction } from "react-router-dom";
import { RoutePaths } from "@/constants/RoutePaths";

class NavigationManager {
  static navigateToMenuCategory(
    navigate: NavigateFunction,
    categoryName: string
  ): void {
    navigate(
      RoutePaths.MENU_PAGE.replace(
        ":categoryName",
        encodeURIComponent(categoryName)
      )
    );
  }

  static navigateToFoodDetail(
    navigate: NavigateFunction,
    foodId: number
  ): void {
    navigate(RoutePaths.FOOD_PAGE.replace(":id", String(foodId)));
  }
}

export default NavigationManager;
