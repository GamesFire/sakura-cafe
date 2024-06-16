import type { FC } from "react";
import Users from "./users/Users";
import Categories from "./categories/Categories";
import Foods from "./foods/Foods";
import Ingredients from "./ingredients/Ingredients";
import Orders from "./orders/Orders";
import Feedbacks from "./feedbacks/Feedbacks";

interface MainContentProps {
  selectedItem: string;
}

const MainContent: FC<MainContentProps> = ({ selectedItem }) => {
  const renderContent = () => {
    switch (selectedItem) {
      case "users":
        return <Users />;
      case "categories":
        return <Categories />;
      case "foods":
        return <Foods />;
      case "ingredients":
        return <Ingredients />;
      case "orders":
        return <Orders />;
      case "feedbacks":
        return <Feedbacks />;
      default:
        return <Users />;
    }
  };

  return <div className="w-full p-4">{renderContent()}</div>;
};

export default MainContent;
