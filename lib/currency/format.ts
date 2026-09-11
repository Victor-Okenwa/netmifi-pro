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

/**
 * Formats a whole-currency amount for transaction rows (e.g. "₦20,000").
 * @param amount - Amount in display currency
 * @param currency - Currency code
 * @returns Prefixed whole-number string
 */
export function formatWholeAmount(amount: number, currency: CurrencyCode): string {
	const formatted = new Intl.NumberFormat("en-US", {
		maximumFractionDigits: 0,
	}).format(Math.round(amount));

	if (currency === "NGN") {
		return `₦${formatted}`;
	}

	return `${currencyPrefix(currency)}${formatted}`;
}

/**
 * Formats a transaction timestamp like "Sep 8th, 01:20:30".
 * @param iso - ISO timestamp
 * @returns Localized display string
 */
export function formatTransactionTimestamp(iso: string): string {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) {
		return "Unknown";
	}

	const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
	const day = date.getDate();
	const ordinal = ordinalSuffix(day);
	const time = new Intl.DateTimeFormat("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	}).format(date);

	return `${month} ${day}${ordinal}, ${time}`;
}

/**
 * Returns the English ordinal suffix for a day of month.
 * @param day - Day of month (1–31)
 * @returns "st" | "nd" | "rd" | "th"
 */
function ordinalSuffix(day: number): string {
	const mod100 = day % 100;
	if (mod100 >= 11 && mod100 <= 13) {
		return "th";
	}

	switch (day % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
}
