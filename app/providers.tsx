"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./theme-provider";

interface ProvidersProps {
	children: ReactNode;
}

/**
 * App-wide client providers: theme, auth, tooltips, and toasts.
 */
export function Providers({ children }: ProvidersProps) {
	return (
		<ThemeProvider>
			<AuthProvider>
				<TooltipProvider delayDuration={0}>
					{children}
					<Toaster closeButton duration={5000} position="bottom-right" richColors />
				</TooltipProvider>
			</AuthProvider>
		</ThemeProvider>
	);
}
