"use client";

import Link from "next/link";
import { LogoIcon } from "@/components/brand/logo-icon";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
	userName?: string;
	onNotificationsClick?: () => void;
	onSupportClick?: () => void;
	onSignOut?: () => void;
	className?: string;
}

/**
 * Top app bar: brand on the left, support and notifications on the right.
 */
export function AppHeader({
	userName,
	onNotificationsClick,
	onSupportClick,
	onSignOut,
	className,
}: AppHeaderProps) {
	return (
		<header
			className={cn(
				"fixed top-0 right-0 left-0 z-50 mx-auto flex w-full max-w-md items-center justify-between gap-3 border-border border-b bg-background px-4 py-3",
				className
			)}
		>
			<Link className="flex min-w-0 items-center gap-2" href="/">
				<LogoIcon className="h-8 w-auto shrink-0" />
				<span className="truncate font-semibold text-lg tracking-tight">
					Netmifi
				</span>
			</Link>
			<div className="flex shrink-0 items-center gap-2">
				{onSignOut ? (
					<button
						aria-label="Sign out"
						className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground"
						onClick={onSignOut}
						type="button"
					>
						<SignOutIcon />
					</button>
				) : null}
				<button
					aria-label="Support"
					className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground"
					onClick={onSupportClick}
					type="button"
				>
					<SupportIcon />
				</button>
				<button
					aria-label="Notifications"
					className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground"
					onClick={onNotificationsClick}
					type="button"
				>
					<BellIcon />
				</button>
			</div>
		</header>
	);
}

function SignOutIcon() {
	return (
		<svg
			aria-hidden
			fill="none"
			height="20"
			viewBox="0 0 24 24"
			width="20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Sign out</title>
			<path
				d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H3.75"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.6"
			/>
		</svg>
	);
}

function SupportIcon() {
	return (
		<svg
			aria-hidden
			fill="none"
			height="20"
			viewBox="0 0 24 24"
			width="20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Support</title>
			<path
				d="M4.5 12a7.5 7.5 0 0 1 15 0v2.25A2.25 2.25 0 0 1 17.25 16.5h-.75v-4.2M4.5 12v2.25A2.25 2.25 0 0 0 6.75 16.5h.75v-4.2M9 19.5h6"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.6"
			/>
		</svg>
	);
}

function BellIcon() {
	return (
		<svg
			aria-hidden
			fill="none"
			height="20"
			viewBox="0 0 24 24"
			width="20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Notifications</title>
			<path
				d="M6 9.75A6 6 0 0 1 18 9.75c0 7.5 3 6.75 3 9H3c0-2.25 3-1.5 3-9Z"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.6"
			/>
			<path
				d="M10 20.25a2 2 0 0 0 4 0"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.6"
			/>
		</svg>
	);
}
