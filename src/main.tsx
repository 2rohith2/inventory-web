import { StrictMode } from "react";

import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";

import { ToastProvider } from "./components/Toast";
import ThemeWrapper from "./theme/ThemeWrapper";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ThemeWrapper />
      </ToastProvider>
    </QueryClientProvider>
  </StrictMode>,
);
