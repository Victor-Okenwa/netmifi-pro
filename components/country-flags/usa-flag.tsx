"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

interface UsaFlagProps {
	className?: string;
}

/**
 * Circular United States flag (USD).
 */
export function UsaFlag({ className }: UsaFlagProps) {
	const maskId = useId().replace(/:/g, "");

	return (
		<svg
			aria-hidden
			className={cn("size-5 shrink-0", className)}
			fill="none"
			viewBox="0 0 512 512"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>United States</title>
			<mask id={maskId}>
				<circle cx="256" cy="256" fill="#fff" r="256" />
			</mask>
			<g mask={`url(#${maskId})`}>
				<path
					d="M256 0h256v64l-32 32 32 32v64l-32 32 32 32v64l-32 32 32 32v64l-256 32L0 448v-64l32-32-32-32v-64z"
					fill="#eee"
				/>
				<path
					d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z"
					fill="#d80027"
				/>
				<path d="M0 0h256v256H0Z" fill="#0052b4" />
				<path
					d="m187 243 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67zm162-81 57-41h-70l57 41-22-67zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Zm162-82 57-41h-70l57 41-22-67Zm-81 0 57-41H93l57 41-22-67zm-81 0 57-41H12l57 41-22-67Z"
					fill="#eee"
				/>
			</g>
		</svg>
	);
}
