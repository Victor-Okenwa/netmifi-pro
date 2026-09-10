"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useAuth } from "@/components/auth/auth-provider";

interface RequireAuthProps {
	children: ReactNode;
}

/**
 * Redirects unauthenticated users to `/login` after auth state is ready.
 */
export function RequireAuth({ children }: RequireAuthProps) {
	const router = useRouter();
	const { session, isReady } = useAuth();

	useEffect(() => {
		if (isReady && !session) {
			router.replace("/login");
		}
	}, [isReady, session, router]);

	if (!isReady || !session) {
		return (
			<div className="mx-auto flex min-h-dvh w-full max-w-md items-center justify-center bg-background px-4">
				<p className="text-muted-foreground text-sm">Loading…</p>
			</div>
		);
	}

	return children;
}
