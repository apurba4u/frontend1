"use client";

import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/providers/AuthProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }) {
  return (
    <HeroUIProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {children}
            <ToastProvider />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
}
