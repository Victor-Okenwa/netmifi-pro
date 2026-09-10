"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { AppHeader } from "@/components/navigation/app-header";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { BOTTOM_NAV_ITEMS } from "@/components/navigation/nav-items";
import { toast } from "@/components/ui/sonner";

interface AppChromeProps {
	children: ReactNode;
}

/**
 * Mobile shell: sticky header, page content, sticky bottom tabs.
 */
export function AppChrome({ children }: AppChromeProps) {
	const pathname = usePathname();
	const router = useRouter();
	const { session, signOut } = useAuth();

	return (
		<div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background">
			<AppHeader
				onNotificationsClick={() => toast("Notifications coming soon")}
				onSignOut={() => {
					signOut();
					toast("Signed out");
					router.replace("/login");
				}}
				onSupportClick={() => toast("Support coming soon")}
				userName={session?.name}
			/>
			<main className="flex-1 pt-[4.25rem] pb-[5.75rem]">{children}</main>
			<BottomNav items={BOTTOM_NAV_ITEMS} pathname={pathname} />
		</div>
	);
}
