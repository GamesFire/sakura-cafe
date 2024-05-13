import type { RouteObject } from "react-router-dom";
import { RoutePaths } from "@constants/RoutePaths";
import HomePage from "@pages/HomePage/HomePage";
import MenuPage from "@pages/MenuPage/MenuPage";
import AboutUsPage from "@pages/AboutUsPage/AboutUsPage";
import ContactPage from "@pages/ContactPage/ContactPage";
import OrderHistoryPage from "@pages/OrderHistoryPage/OrderHistoryPage";
import AdminPage from "@pages/AdminPage/AdminPage";

const role: "guest" | "user" | "admin" = "admin";

const guestRoutes: RouteObject[] = [
  { path: RoutePaths.HOME_PAGE, Component: HomePage },
  { path: RoutePaths.MENU_PAGE, Component: MenuPage },
  { path: RoutePaths.ABOUT_US_PAGE, Component: AboutUsPage },
  { path: RoutePaths.CONTACT_PAGE, Component: ContactPage },
];

const userRoutes: RouteObject[] = [
  ...guestRoutes,
  { path: RoutePaths.ORDER_HISTORY_PAGE, Component: OrderHistoryPage },
];

const adminRoutes: RouteObject[] = [
  ...userRoutes,
  { path: RoutePaths.ADMIN_PAGE, Component: AdminPage },
];

export const routes =
  role === "admin" ? adminRoutes : role === "user" ? userRoutes : guestRoutes;
