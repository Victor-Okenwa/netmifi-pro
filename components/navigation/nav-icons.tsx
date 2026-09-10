import type { SVGProps } from "react";

/**
 * 2×2 rounded squares (Figma Home tab).
 */
export function HomeNavIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			fill="none"
			height="24"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Home</title>
			<rect height="7" rx="1.6" stroke="currentColor" strokeWidth="1.6" width="7" x="3.5" y="3.5" />
			<rect
				height="7"
				rx="1.6"
				stroke="currentColor"
				strokeWidth="1.6"
				width="7"
				x="13.5"
				y="3.5"
			/>
			<rect
				height="7"
				rx="1.6"
				stroke="currentColor"
				strokeWidth="1.6"
				width="7"
				x="3.5"
				y="13.5"
			/>
			<rect
				height="7"
				rx="1.6"
				stroke="currentColor"
				strokeWidth="1.6"
				width="7"
				x="13.5"
				y="13.5"
			/>
		</svg>
	);
}

/**
 * Two people with a list (Figma Trade Requests tab).
 */
export function TradeRequestsNavIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			fill="none"
			height="24"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Trade requests</title>
			<circle cx="8" cy="7.5" r="2.25" stroke="currentColor" strokeWidth="1.6" />
			<path
				d="M4.5 16.5c.4-2.4 2-3.75 3.5-3.75s3.1 1.35 3.5 3.75"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.6"
			/>
			<circle cx="14.25" cy="8.25" r="1.85" stroke="currentColor" strokeWidth="1.5" />
			<path
				d="M16 16.5c.2-1.6 1.1-2.6 2.25-2.6"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.5"
			/>
			<path
				d="M18.25 8.5h3.25M18.25 12h3.25M18.25 15.5h3.25"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.5"
			/>
		</svg>
	);
}

/**
 * Open book with a signal (Figma Courses tab).
 */
export function CoursesNavIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			fill="none"
			height="24"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Courses</title>
			<path
				d="M4.5 18.5V7.2c0-.66.54-1.2 1.2-1.2H12v11.3L5.7 19.5A1.2 1.2 0 0 1 4.5 18.5Z"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.6"
			/>
			<path
				d="M19.5 18.5V7.2c0-.66-.54-1.2-1.2-1.2H12v11.3l6.3 1.2a1.2 1.2 0 0 0 1.2-1.2Z"
				stroke="currentColor"
				strokeLinejoin="round"
				strokeWidth="1.6"
			/>
			<path d="M12 6V18.5" stroke="currentColor" strokeWidth="1.6" />
			<path
				d="M12 4.2c1.1-1 2.5-1.5 4-1.5"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.5"
			/>
			<path
				d="M12 4.2c.7-.55 1.5-.85 2.4-.95"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.5"
			/>
		</svg>
	);
}

/**
 * Bar chart (Figma Analytics tab).
 */
export function AnalyticsNavIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			fill="none"
			height="24"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Analytics</title>
			<path d="M5 19V11.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
			<path d="M10 19V8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
			<path d="M15 19V5.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
			<path d="M20 19V13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
		</svg>
	);
}

/**
 * Person silhouette (Figma Dispute tab).
 */
export function DisputeNavIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			fill="none"
			height="24"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Dispute</title>
			<circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.6" />
			<path
				d="M5.5 19.25c.85-3.4 3.2-5 6.5-5s5.65 1.6 6.5 5"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.6"
			/>
		</svg>
	);
}
