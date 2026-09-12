import type { SwapOffer } from "@/lib/matching/types";

const OFFER_STORAGE_KEY = "netmifi-pro:swap-offer";

/**
 * Persists the current swap offer for the matching results page.
 * @param offer - Offer to store
 */
export function writeSwapOffer(offer: SwapOffer): void {
	if (typeof window === "undefined") {
		return;
	}

	try {
		window.sessionStorage.setItem(OFFER_STORAGE_KEY, JSON.stringify(offer));
	} catch {
		// Ignore private / restricted storage failures.
	}
}

/**
 * Reads the stored swap offer from sessionStorage.
 * @returns Parsed offer, or null when missing / invalid
 */
export function readSwapOffer(): SwapOffer | null {
	if (typeof window === "undefined") {
		return null;
	}

	try {
		const raw = window.sessionStorage.getItem(OFFER_STORAGE_KEY);
		if (!raw) {
			return null;
		}

		const parsed: unknown = JSON.parse(raw);
		if (!isSwapOffer(parsed)) {
			return null;
		}

		return parsed;
	} catch {
		return null;
	}
}

/**
 * Type guard for stored swap offers.
 * @param value - Unknown parsed JSON
 * @returns Whether value is a SwapOffer
 */
function isSwapOffer(value: unknown): value is SwapOffer {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	if (!("kind" in value) || !("teach" in value) || !("learn" in value)) {
		return false;
	}

	const record = value as Record<string, unknown>;
	return (
		(record.kind === "general" || record.kind === "school") &&
		Array.isArray(record.teach) &&
		Array.isArray(record.learn)
	);
}
