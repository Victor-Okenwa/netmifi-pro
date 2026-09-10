/**
 * Returns the first letter of a display name for avatar fallbacks.
 * @param name - Full display name
 * @returns Uppercase initial, or "?" when empty
 */
export function getNameInitial(name: string): string {
	const trimmed = name.trim();
	if (!trimmed) {
		return "?";
	}
	return trimmed.charAt(0).toUpperCase();
}

/**
 * Formats an ISO date for profile display.
 * @param iso - ISO timestamp
 * @returns Localized date string
 */
export function formatSignedInDate(iso: string): string {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) {
		return "Unknown";
	}

	return new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
}
