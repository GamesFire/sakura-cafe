import type { RouteObject } from "react-router-dom";
import { RoutePaths } from "@constants/RoutePaths";
import HomePage from "@pages/HomePage/HomePage";
import MenuPage from "@pages/MenuPage/MenuPage";
import FoodPage from "@pages/FoodPage/FoodPage";
import AboutUsPage from "@pages/AboutUsPage/AboutUsPage";
import ContactPage from "@pages/ContactPage/ContactPage";
import PrivacyPolicyPage from "@pages/PrivacyPolicyPage/PrivacyPolicyPage";
import TermsAndConditionsPage from "@pages/TermsAndConditionsPage/TermsAndConditionsPage";
import OrderHistoryPage from "@pages/OrderHistoryPage/OrderHistoryPage";
import AdminPage from "@pages/AdminPage/AdminPage";
import type { Role } from "@/types/Role";

const guestRoutes: RouteObject[] = [
  { path: RoutePaths.HOME_PAGE, Component: HomePage },
  { path: RoutePaths.MENU_PAGE, Component: MenuPage },
  { path: RoutePaths.FOOD_PAGE, Component: FoodPage },
  { path: RoutePaths.ABOUT_US_PAGE, Component: AboutUsPage },
  { path: RoutePaths.CONTACT_PAGE, Component: ContactPage },
  { path: RoutePaths.PRIVACY_POLICY_PAGE, Component: PrivacyPolicyPage },
  {
    path: RoutePaths.TERMS_AND_CONDITIONS_PAGE,
    Component: TermsAndConditionsPage,
  },
];

const userRoutes: RouteObject[] = [
  ...guestRoutes,
  { path: RoutePaths.ORDER_HISTORY_PAGE, Component: OrderHistoryPage },
];

const adminRoutes: RouteObject[] = [
  ...userRoutes,
  { path: RoutePaths.ADMIN_PAGE, Component: AdminPage },
];

export const configureRoutes = (role: Role): RouteObject[] => {
  if (role === "admin") {
    return adminRoutes;
  } else if (role === "user") {
    return userRoutes;
  } else {
    return guestRoutes;
  }
};
