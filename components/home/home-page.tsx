"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { HomeGreeting } from "@/components/home/home-greeting";

/**
 * Authenticated home screen with greeting and currency controls.
 */
export function HomePageClient() {
	const { session } = useAuth();

	if (!session) {
		return null;
	}

	return (
		<section className="px-4 py-6">
			<HomeGreeting email={session.email} fullName={session.name} />
			<p className="mt-6 text-muted-foreground text-sm">
				Your skill trades and courses will show up here.
			</p>
		</section>
	);
}
