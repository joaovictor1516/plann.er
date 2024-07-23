import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import { App } from "./app";
import React from "react";
import "./index.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
    <Toaster richColors/>
  </React.StrictMode>
)