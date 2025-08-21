import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx"; // using app.js as requested

createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);