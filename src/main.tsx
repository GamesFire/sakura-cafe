import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";
import DynamicRouter from "./routes/DynamicRouter";

export const store = setupStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <DynamicRouter />
    </React.StrictMode>
  </Provider>
);
