import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { ThemeContextProvider } from "./store/theme-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
