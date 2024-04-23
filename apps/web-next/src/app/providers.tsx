"use client";

import { ReactNode } from "react";
import { Toaster } from "@project/ui";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <Toaster />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
