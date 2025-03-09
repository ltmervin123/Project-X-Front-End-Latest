import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from "./context/AuthContext";
import { AnalyticsContextProvider } from "./context/AnalyticsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <AnalyticsContextProvider>
        <App />
      </AnalyticsContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>
);

reportWebVitals();
