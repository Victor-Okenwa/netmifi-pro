/**
 * Case-insensitive set membership for skill / course labels.
 * @param items - Candidate labels
 * @returns Normalized lowercase set
 */
export function toLabelSet(items: string[]): Set<string> {
	return new Set(items.map((item) => item.trim().toLowerCase()).filter(Boolean));
}

/**
 * Returns whether two label lists share at least one entry.
 * @param left - First label list
 * @param right - Second label list
 * @returns True when any label overlaps
 */
export function labelsOverlap(left: string[], right: string[]): boolean {
	if (left.length === 0 || right.length === 0) {
		return false;
	}

	const rightSet = toLabelSet(right);
	return left.some((item) => rightSet.has(item.trim().toLowerCase()));
}
