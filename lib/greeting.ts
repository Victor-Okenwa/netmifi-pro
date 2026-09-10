/**
 * Returns a time-of-day greeting for the local clock.
 * @param date - Instant to evaluate (defaults to now)
 * @returns "Good Morning" | "Good Afternoon" | "Good Evening"
 */
export function getTimeOfDayGreeting(date: Date = new Date()): string {
	const hour = date.getHours();

	if (hour < 12) {
		return "Good Morning";
	}

	if (hour < 17) {
		return "Good Afternoon";
	}

	return "Good Evening";
}

/**
 * Extracts the first name from a full display name.
 * @param fullName - User's full name
 * @returns First token, or "there" when empty
 */
export function getFirstName(fullName: string): string {
	const trimmed = fullName.trim();
	if (!trimmed) {
		return "there";
	}

	const [first] = trimmed.split(/\s+/);
	return first ?? "there";
}
