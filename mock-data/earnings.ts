import type { CurrencyCode } from "@/lib/currency/types";

/**
 * Demo earnings stored in NGN (base currency for the mock).
 */
export interface EarningsSnapshot {
	totalNgn: number;
	earnedTodayNgn: number;
}

export const MOCK_EARNINGS: EarningsSnapshot = {
	totalNgn: 400_000.58,
	earnedTodayNgn: 10_000,
};

/** Rough demo FX rates from NGN for display only. */
const RATES_FROM_NGN: Record<CurrencyCode, number> = {
	NGN: 1,
	GHS: 0.0082,
	USD: 0.00062,
};

/**
 * Converts a NGN amount into the selected display currency.
 * @param amountNgn - Amount in Nigerian Naira
 * @param currency - Target currency code
 * @returns Converted amount
 */
export function convertFromNgn(amountNgn: number, currency: CurrencyCode): number {
	return amountNgn * RATES_FROM_NGN[currency];
}

/**
 * Converts an amount between display currencies via NGN.
 * @param amount - Amount in the source currency
 * @param from - Source currency
 * @param to - Target currency
 * @returns Converted amount
 */
export function convertCurrency(amount: number, from: CurrencyCode, to: CurrencyCode): number {
	if (from === to) {
		return amount;
	}

	const amountNgn = amount / RATES_FROM_NGN[from];
	return convertFromNgn(amountNgn, to);
}
