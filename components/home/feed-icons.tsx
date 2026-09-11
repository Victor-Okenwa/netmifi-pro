import type { SVGProps } from "react";
import { cn } from "@/lib/utils";
import type { ActivityKind } from "@/mock-data/home-feed";

interface ActivityIconProps {
	kind: ActivityKind;
	className?: string;
}

/**
 * Colored glyph for a recent-activity row.
 */
export function ActivityIcon({ kind, className }: ActivityIconProps) {
	switch (kind) {
		case "messages":
			return <MessagesBellIcon className={cn("size-6 text-primary", className)} />;
		case "requests":
			return <RequestsUserIcon className={cn("size-6 text-emerald-600", className)} />;
		case "matches":
			return <MatchesMarkIcon className={cn("size-6", className)} />;
	}
}

function MessagesBellIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg aria-hidden fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<title>Messages</title>
			<path
				d="M6 9.75A6 6 0 0 1 18 9.75c0 7.5 3 6.75 3 9H3c0-2.25 3-1.5 3-9Z"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.7"
			/>
			<path
				d="M10 20.25a2 2 0 0 0 4 0"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.7"
			/>
		</svg>
	);
}

function RequestsUserIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg aria-hidden fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<title>Requests</title>
			<path
				d="M12 11a3.25 3.25 0 1 0 0-6.5A3.25 3.25 0 0 0 12 11Z"
				stroke="currentColor"
				strokeWidth="1.7"
			/>
			<path
				d="M6.5 18.5c.7-2.4 2.7-3.75 5.5-3.75s4.8 1.35 5.5 3.75"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.7"
			/>
			<path
				d="M18.5 8.25a3.5 3.5 0 1 0-1.1-6.8M5.5 8.25a3.5 3.5 0 1 1 1.1-6.8"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.7"
			/>
		</svg>
	);
}

function MatchesMarkIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg aria-hidden fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
			<title>Matches</title>
			<circle cx="12" cy="12" fill="#0D9488" r="10" />
			<path
				d="M12 5.5 16.5 12 12 18.5 7.5 12 12 5.5Z"
				fill="#fff"
				stroke="#fff"
				strokeLinejoin="round"
				strokeWidth="1"
			/>
			<path
				d="M10.6 10.2h2.8c.7 0 1.2.45 1.2 1.1 0 .55-.35.95-.9 1.05l1.15 1.95h-1.25l-1-1.75H11.7V14.3h-1.1V10.2Zm1.1.9v1.35h1.45c.35 0 .55-.18.55-.45s-.2-.45-.55-.45H11.7Z"
				fill="#0D9488"
			/>
		</svg>
	);
}

/**
 * Circular transfer glyph used on transaction rows.
 */
export function TransferIcon({ className }: { className?: string }) {
	return (
		<span
			className={cn(
				"flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-foreground dark:bg-indigo-950/50",
				className
			)}
		>
			<svg
				aria-hidden
				className="size-5"
				fill="none"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Transfer</title>
				<path d="M8 8.5h8v7H8z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
				<path
					d="M11 11h2.2M11 13h1.4"
					stroke="currentColor"
					strokeLinecap="round"
					strokeWidth="1.6"
				/>
				<path
					d="M14.5 6.5 17.5 5.5 16.5 8.5"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.6"
				/>
				<path d="m15.2 7.2 2.8-2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
			</svg>
		</span>
	);
}
