"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface NigeriaFlagProps {
	className?: string;
}

/**
 * Circular Nigeria flag (NGN).
 */
export function NigeriaFlag({ className }: NigeriaFlagProps) {
	const maskId = useId().replace(/:/g, "");

	return (
		<svg
			aria-hidden
			className={cn("size-5 shrink-0", className)}
			fill="none"
			viewBox="0 0 512 512"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Nigeria</title>
			<mask id={maskId}>
				<circle cx="256" cy="256" fill="#fff" r="256" />
			</mask>
			<g mask={`url(#${maskId})`}>
				<path d="M0 0v512h160l96-64 96 64h160V0H352l-96 64-96-64Z" fill="#6da544" />
				<path d="M160 0h192v512H160Z" fill="#eee" />
			</g>
		</svg>
	);
}
