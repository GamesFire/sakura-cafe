import "./Navbar.css";
import type { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RoutePaths } from "@constants/RoutePaths";
import { getActiveNavLinkClass } from "@/utils/getActiveNavLinkClass";

const Navbar: FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <NavLink
        className={getActiveNavLinkClass(location, "/menu")}
        to={RoutePaths.MENU_PAGE}
        onClick={(e) =>
          location.pathname.includes("/menu") && e.preventDefault()
        }
      >
        Меню
      </NavLink>
      <NavLink
        className={getActiveNavLinkClass(location, RoutePaths.ABOUT_US_PAGE)}
        to={RoutePaths.ABOUT_US_PAGE}
      >
        Про нас
      </NavLink>
      <NavLink
        className={getActiveNavLinkClass(location, RoutePaths.CONTACT_PAGE)}
        to={RoutePaths.CONTACT_PAGE}
      >
        Контакти
      </NavLink>
    </nav>
  );
};

export default Navbar;
