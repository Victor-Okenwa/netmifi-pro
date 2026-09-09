import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names with Tailwind-aware conflict resolution.
 * @param inputs - Class values to merge
 * @returns A single className string
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
