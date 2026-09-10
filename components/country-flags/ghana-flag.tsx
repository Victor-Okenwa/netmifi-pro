"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface GhanaFlagProps {
	className?: string;
}

/**
 * Circular Ghana flag (GHS).
 */
export function GhanaFlag({ className }: GhanaFlagProps) {
	const maskId = useId().replace(/:/g, "");

	return (
		<svg
			aria-hidden
			className={cn("size-5 shrink-0", className)}
			fill="none"
			viewBox="0 0 512 512"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Ghana</title>
			<mask id={maskId}>
				<circle cx="256" cy="256" fill="#fff" r="256" />
			</mask>
			<g mask={`url(#${maskId})`}>
				<path d="m0 167 256-32 256 32v178l-256 32L0 345Z" fill="#ffda44" />
				<path d="M0 0h512v167H0Z" fill="#d80027" />
				<path d="M0 345h512v167H0Z" fill="#496e2d" />
				<path d="m198 345 151-109H163l151 109-58-178Z" fill="#333" />
			</g>
		</svg>
	);
}
