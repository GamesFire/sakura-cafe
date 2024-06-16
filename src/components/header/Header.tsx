import "./Header.css";
import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { RoutePaths } from "@constants/RoutePaths";
import Navbar from "../navbar/Navbar";
import Account from "../account/Account";
import Tray from "../tray/Tray";

const Header: FC = () => {
  return (
    <header className="header">
      <NavLink to={RoutePaths.HOME_PAGE}>
        <img src="/images/logo.png" alt="Логотип" width={264} />
      </NavLink>
      <Navbar />
      <div className="flex items-center">
        <Account />
        <Tray />
      </div>
    </header>
  );
};

export default Header;
