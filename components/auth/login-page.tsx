"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { useAuth } from "@/components/auth/auth-provider";
import { LogoIcon } from "@/components/brand/logo-icon";
import { toast } from "@/components/ui/sonner";
import type { AuthMode } from "@/lib/auth/types";

/**
 * Login / sign-up screen. First destination when there is no session.
 */
export function LoginPageClient() {
	const router = useRouter();
	const { session, isReady, signIn, signUp } = useAuth();
	const [mode, setMode] = useState<AuthMode>("sign-in");

	useEffect(() => {
		if (isReady && session) {
			router.replace("/");
		}
	}, [isReady, session, router]);

	if (!isReady || session) {
		return (
			<div className="mx-auto flex min-h-dvh w-full max-w-md items-center justify-center bg-background px-4">
				<p className="text-muted-foreground text-sm">Loading…</p>
			</div>
		);
	}

	return (
		<div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background px-4 py-8">
			<div className="mb-10 flex items-center gap-2">
				<LogoIcon className="h-9 w-auto" />
				<span className="font-semibold text-xl tracking-tight">Netmifi</span>
			</div>

			<AuthForm
				mode={mode}
				onModeChange={setMode}
				onSignIn={async (values) => {
					await signIn(values);
					toast.success("Welcome back");
					router.replace("/");
				}}
				onSignUp={async (values) => {
					await signUp(values);
					toast.success("Account created");
					router.replace("/");
				}}
			/>
		</div>
	);
}
