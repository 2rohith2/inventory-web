import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from "react";

import { Snackbar, Alert, type AlertColor } from "@mui/material";

type Toast = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

type ToastContextType = {
  showToast: (message: string, severity?: AlertColor) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast>({
    open: false,
    message: "",
    severity: "success",
  });

  const showToast = useCallback(
    (message: string, severity: AlertColor = "success") => {
      setToast({ open: true, message, severity });
    },
    [],
  );

  function getColors() {
    switch (toast.severity) {
      case "success":
        return {
          bg: "var(--success-background)",
          fg: "var(--success-foreground)",
        };
      case "warning":
        return {
          bg: "var(--warning-background)",
          fg: "var(--warning-foreground)",
        };
      case "error":
        return {
          bg: "var(--error-background)",
          fg: "var(--error-foreground)",
        };
      default:
        return {
          bg: "var(--success-background)",
          fg: "var(--success-foreground)",
        };
    }
  }

  const colors = getColors();

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            open: false,
          }))
        }
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() =>
            setToast((prev) => ({
              ...prev,
              open: false,
            }))
          }
          sx={{
            width: "100%",
            backgroundColor: colors.bg,
            color: colors.fg,
            fontWeight: 500,
            "& .MuiAlert-icon": {
              color: colors.fg,
            },
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
