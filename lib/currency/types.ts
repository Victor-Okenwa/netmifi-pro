export type CurrencyCode = "NGN" | "GHS" | "USD";

export interface CurrencyOption {
	code: CurrencyCode;
	label: string;
	country: string;
}
