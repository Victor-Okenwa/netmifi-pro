import type { CurrencyCode } from "@/lib/currency/types";

/**
 * Returns the symbol/prefix used before the amount.
 * @param currency - Currency code
 * @returns Prefix string (N / GH₵ / $)
 */
export function currencyPrefix(currency: CurrencyCode): string {
	switch (currency) {
		case "NGN":
			return "N";
		case "GHS":
			return "GH₵";
		case "USD":
			return "$";
	}
}

/**
 * Formats the main balance for the earnings card.
 * @param amount - Amount in display currency
 * @param currency - Currency code
 * @returns Prefixed balance string such as "N400,000.58"
 */
export function formatBalance(amount: number, currency: CurrencyCode): string {
	const formatted = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);

	return `${currencyPrefix(currency)}${formatted}`;
}

/**
 * Formats a daily earnings delta like "+10,000" without a currency prefix.
 * @param amount - Delta in display currency
 * @returns Signed whole-number string
 */
export function formatEarnedToday(amount: number): string {
	const whole = Math.round(amount);
	const formatted = new Intl.NumberFormat("en-US", {
		maximumFractionDigits: 0,
	}).format(Math.abs(whole));

	if (whole > 0) {
		return `+${formatted}`;
	}
	if (whole < 0) {
		return `-${formatted}`;
	}
	return formatted;
}

/**
 * Masked placeholder when the balance is hidden.
 * @param currency - Currency code
 * @returns Prefixed masked string
 */
export function formatHiddenBalance(currency: CurrencyCode): string {
	return `${currencyPrefix(currency)}••••••`;
}
