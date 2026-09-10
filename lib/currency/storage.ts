import { DEFAULT_CURRENCY, isCurrencyCode } from "@/lib/currency/currencies";
import type { CurrencyCode } from "@/lib/currency/types";

const CURRENCY_STORAGE_KEY = "netmifi-pro:currency";

/**
 * Reads the preferred currency from localStorage.
 * @returns Stored currency, or NGN when missing / invalid
 */
export function readStoredCurrency(): CurrencyCode {
	if (typeof window === "undefined") {
		return DEFAULT_CURRENCY;
	}

	try {
		const raw = window.localStorage.getItem(CURRENCY_STORAGE_KEY);
		if (isCurrencyCode(raw)) {
			return raw;
		}
	} catch {
		// Ignore storage failures in private / restricted contexts.
	}

	return DEFAULT_CURRENCY;
}

/**
 * Persists the preferred currency to localStorage.
 * @param code - Currency to store
 */
export function writeStoredCurrency(code: CurrencyCode): void {
	if (typeof window === "undefined") {
		return;
	}

	try {
		window.localStorage.setItem(CURRENCY_STORAGE_KEY, code);
	} catch {
		// Ignore storage failures in private / restricted contexts.
	}
}
