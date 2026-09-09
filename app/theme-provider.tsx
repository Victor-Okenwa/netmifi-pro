"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

interface ThemeProviderProps {
	children: ReactNode;
}

/**
 * Applies the `.dark` class on `<html>` so design tokens match netmifi-mono.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="light"
			disableTransitionOnChange
			enableColorScheme={false}
			enableSystem={false}
			storageKey="ui-theme"
		>
			{children}
		</NextThemesProvider>
	);
}
