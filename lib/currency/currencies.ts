import type { ComponentType } from "react";
import { GhanaFlag, NigeriaFlag, UsaFlag } from "@/components/country-flags";
import type { CurrencyCode, CurrencyOption } from "@/lib/currency/types";

interface CurrencyOptionWithFlag extends CurrencyOption {
	Flag: ComponentType<{ className?: string }>;
}

export const DEFAULT_CURRENCY: CurrencyCode = "NGN";

export const CURRENCIES: readonly CurrencyOptionWithFlag[] = [
	{
		code: "NGN",
		label: "Nigerian Naira",
		country: "Nigeria",
		Flag: NigeriaFlag,
	},
	{
		code: "GHS",
		label: "Ghanaian Cedi",
		country: "Ghana",
		Flag: GhanaFlag,
	},
	{
		code: "USD",
		label: "US Dollar",
		country: "United States",
		Flag: UsaFlag,
	},
] as const;

/**
 * Looks up a currency option by code.
 * @param code - Currency code
 * @returns Matching option, or the default NGN option
 */
export function getCurrencyOption(code: CurrencyCode): CurrencyOptionWithFlag {
	const match = CURRENCIES.find((currency) => currency.code === code);
	if (match) {
		return match;
	}

	const fallback = CURRENCIES.find((currency) => currency.code === DEFAULT_CURRENCY);
	if (!fallback) {
		throw new Error("Default currency is not configured");
	}

	return fallback;
}

/**
 * Type guard for stored currency codes.
 * @param value - Unknown value from storage
 * @returns Whether value is a supported currency code
 */
export function isCurrencyCode(value: unknown): value is CurrencyCode {
	return value === "NGN" || value === "GHS" || value === "USD";
}
