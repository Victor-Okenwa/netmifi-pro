import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Classical building with pillars — used for General Skill Swap.
 */
export function ClassicalBuildingIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden
			className={cn("size-10", className)}
			fill="none"
			viewBox="0 0 40 40"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Classical building</title>
			<path
				d="M6 34h28M8 34V18.5M32 34V18.5M5 18.5h30M20 6l14 10.5H6L20 6Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.75"
			/>
			<path
				d="M12.5 34V22.5M17.5 34V22.5M22.5 34V22.5M27.5 34V22.5"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.75"
			/>
			<path d="M20 6v3.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
		</svg>
	);
}

/**
 * School / campus building — used for School Course Swap.
 */
export function SchoolBuildingIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden
			className={cn("size-10", className)}
			fill="none"
			viewBox="0 0 40 40"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>School building</title>
			<path
				d="M7 34V16.5L20 8l13 8.5V34"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.75"
			/>
			<path
				d="M14 34V24h12v10"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.75"
			/>
			<path
				d="M11.5 20.5h3M17.5 20.5h3M25.5 20.5h3M11.5 25.5h3M25.5 25.5h3"
				stroke="currentColor"
				strokeLinecap="round"
				strokeWidth="1.75"
			/>
			<path d="M20 8v4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.75" />
		</svg>
	);
}

/**
 * Back chevron for page-local navigation.
 */
export function BackChevronIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg
			aria-hidden
			className={cn("size-6", className)}
			fill="none"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Back</title>
			<path
				d="M15 6 9 12l6 6"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
			/>
		</svg>
	);
}
