"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          borderRadius: "12px",
          background: "#111827",
          color: "#fff",
        },
        success: {
          style: {
            background: "#0f766e",
          },
        },
        error: {
          style: {
            background: "#b91c1c",
          },
        },
      }}
    />
  );
}
