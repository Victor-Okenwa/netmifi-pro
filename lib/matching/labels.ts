/**
 * Case-insensitive set membership for skill / course labels.
 * @param items - Candidate labels
 * @returns Normalized lowercase set
 */
export function toLabelSet(items: string[]): Set<string> {
	return new Set(items.map((item) => item.trim().toLowerCase()).filter(Boolean));
}

/**
 * Returns labels from `left` that also appear in `right` (case-insensitive).
 * @param left - First label list (original casing preserved from left)
 * @param right - Second label list
 * @returns Overlapping labels using left's casing
 */
export function intersectLabels(left: string[], right: string[]): string[] {
	if (left.length === 0 || right.length === 0) {
		return [];
	}

	const rightSet = toLabelSet(right);
	const seen = new Set<string>();
	const matches: string[] = [];

	for (const item of left) {
		const key = item.trim().toLowerCase();
		if (!key || seen.has(key) || !rightSet.has(key)) {
			continue;
		}
		seen.add(key);
		matches.push(item.trim());
	}

	return matches;
}

/**
 * Returns whether two label lists share at least one entry.
 * @param left - First label list
 * @param right - Second label list
 * @returns True when any label overlaps
 */
export function labelsOverlap(left: string[], right: string[]): boolean {
	return intersectLabels(left, right).length > 0;
}
