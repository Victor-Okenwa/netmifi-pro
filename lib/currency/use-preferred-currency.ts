"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_CURRENCY } from "@/lib/currency/currencies";
import { readStoredCurrency, writeStoredCurrency } from "@/lib/currency/storage";
import type { CurrencyCode } from "@/lib/currency/types";

/**
 * Preferred display currency, synced with localStorage.
 * @returns Currency value and setter that persist the choice
 */
export function usePreferredCurrency() {
	const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		setCurrencyState(readStoredCurrency());
		setIsReady(true);
	}, []);

	const setCurrency = useCallback((code: CurrencyCode) => {
		setCurrencyState(code);
		writeStoredCurrency(code);
	}, []);

	return { currency, setCurrency, isReady };
}
