import { type FC, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { configureRoutes } from "./routes";
import { RootState } from "@/store/store";
import App from "@/App";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

const DynamicRouter: FC = () => {
  const { userInfo } = useAppSelector(
    (state: RootState) => state.authenticationSlice
  );

  const role = userInfo ? userInfo.role : "guest";

  const [router, setRouter] = useState<ReturnType<typeof createBrowserRouter>>(
    createBrowserRouter([
      {
        path: "/",
        element: <App />,
        children: configureRoutes(role),
        errorElement: <NotFoundPage />,
      },
    ])
  );

  useEffect(() => {
    if (role !== "guest") {
      const newRouter = createBrowserRouter([
        {
          path: "/",
          element: <App />,
          children: configureRoutes(role),
          errorElement: <NotFoundPage />,
        },
      ]);
      setRouter(newRouter);
    }
  }, [role]);

  return <RouterProvider router={router} />;
};

export default DynamicRouter;
