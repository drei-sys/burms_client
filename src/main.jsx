import React from "react";
import ReactDOM from "react-dom/client";
import "bulma/css/bulma.min.css";
import "bulma/css/icons/css/all.min.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
