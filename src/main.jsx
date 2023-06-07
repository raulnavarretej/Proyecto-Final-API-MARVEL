import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FavContext } from "./store/FavContext";
import { GeneralContext } from "./store/GeneralContext";
import "./style/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GeneralContext>
      <FavContext>
        <App />
      </FavContext>
    </GeneralContext>
  </React.StrictMode>
);
