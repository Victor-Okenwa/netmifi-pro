/**
 * Formats a count for hero stats (20, 40K).
 * @param value - Whole number
 * @returns Compact display string
 */
export function formatCompactCount(value: number): string {
	if (value >= 1_000_000) {
		const millions = value / 1_000_000;
		return `${Number.isInteger(millions) ? millions : millions.toFixed(1)}M`;
	}
	if (value >= 1_000) {
		const thousands = value / 1_000;
		return `${Number.isInteger(thousands) ? thousands : thousands.toFixed(1)}K`;
	}
	return String(value);
}

/**
 * Formats a count with grouping separators (126,811).
 * @param value - Whole number
 * @returns Locale-formatted string
 */
export function formatGroupedCount(value: number): string {
	return new Intl.NumberFormat("en-US").format(value);
}

/**
 * Formats a profile join date like "Jan 19, 2025".
 * @param iso - ISO timestamp
 * @returns Display date, or "Unknown" when invalid
 */
export function formatJoinedDate(iso: string): string {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) {
		return "Unknown";
	}

	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC",
	}).format(date);
}
