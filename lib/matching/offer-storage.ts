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
		window.localStorage.setItem(OFFER_STORAGE_KEY, JSON.stringify(offer));
	} catch {
		// Ignore private / restricted storage failures.
	}
}

/**
 * Reads the stored swap offer (session first, then local).
 * @returns Parsed offer, or null when missing / invalid
 */
export function readSwapOffer(): SwapOffer | null {
	if (typeof window === "undefined") {
		return null;
	}

	try {
		const raw =
			window.sessionStorage.getItem(OFFER_STORAGE_KEY) ??
			window.localStorage.getItem(OFFER_STORAGE_KEY);
		if (!raw) {
			return null;
		}

		return parseOfferJson(raw);
	} catch {
		return null;
	}
}

/**
 * Encodes an offer for the matches URL query string.
 * @param offer - Offer to encode
 * @returns URI-encoded JSON
 */
export function encodeOfferParam(offer: SwapOffer): string {
	return encodeURIComponent(JSON.stringify(offer));
}

/**
 * Decodes an offer from the matches URL query string.
 * @param raw - Encoded query value
 * @returns Parsed offer, or null when invalid
 */
export function decodeOfferParam(raw: string | null | undefined): SwapOffer | null {
	if (!raw) {
		return null;
	}

	try {
		return parseOfferJson(decodeURIComponent(raw));
	} catch {
		return null;
	}
}

/**
 * Builds the matching results href for an offer.
 * @param offer - Offer to match
 * @returns Path with offer query param
 */
export function buildMatchesHref(offer: SwapOffer): string {
	return `/swap-skill/matches?offer=${encodeOfferParam(offer)}`;
}

/**
 * Parses and validates offer JSON.
 * @param raw - JSON string
 * @returns SwapOffer or null
 */
function parseOfferJson(raw: string): SwapOffer | null {
	const parsed: unknown = JSON.parse(raw);
	if (!isSwapOffer(parsed)) {
		return null;
	}
	return parsed;
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

	const record = value as Record<string, unknown>;
	if (record.kind !== "general" && record.kind !== "school") {
		return false;
	}
	if (!Array.isArray(record.teach) || !Array.isArray(record.learn)) {
		return false;
	}
	if (typeof record.rateAmount !== "number" || typeof record.ratePeriod !== "string") {
		return false;
	}
	if (typeof record.currency !== "string") {
		return false;
	}

	return true;
}
