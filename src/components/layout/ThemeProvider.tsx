"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      attribute="class" 
      themes={['light', 'dark', 'midnight']} 
      defaultTheme="light"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
