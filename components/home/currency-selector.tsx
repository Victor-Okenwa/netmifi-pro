"use client";

import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CURRENCIES, getCurrencyOption } from "@/lib/currency/currencies";
import { readStoredCurrency, writeStoredCurrency } from "@/lib/currency/storage";
import type { CurrencyCode } from "@/lib/currency/types";
import { cn } from "@/lib/utils";

interface CurrencySelectorProps {
	className?: string;
	value?: CurrencyCode;
	onValueChange?: (code: CurrencyCode) => void;
}

/**
 * Pill-shaped currency picker for NGN, GHS, and USD.
 */
export function CurrencySelector({ className, value, onValueChange }: CurrencySelectorProps) {
	const [internalValue, setInternalValue] = useState<CurrencyCode>("NGN");

	useEffect(() => {
		if (value !== undefined) {
			return;
		}
		setInternalValue(readStoredCurrency());
	}, [value]);

	const selectedCode = value ?? internalValue;
	const selected = getCurrencyOption(selectedCode);
	const Flag = selected.Flag;

	function handleChange(next: string) {
		if (next !== "NGN" && next !== "GHS" && next !== "USD") {
			return;
		}

		if (value === undefined) {
			setInternalValue(next);
			writeStoredCurrency(next);
		}

		onValueChange?.(next);
	}

	return (
		<Select onValueChange={handleChange} value={selectedCode}>
			<SelectTrigger
				aria-label="Select currency"
				className={cn(
					"h-9 gap-1.5 rounded-full border-foreground/25 bg-background px-2.5 pr-2 font-medium text-foreground shadow-none",
					"data-[size=default]:h-9 dark:bg-background",
					className
				)}
				size="default"
			>
				<Flag className="size-5" />
				<SelectValue>{selectedCode}</SelectValue>
			</SelectTrigger>
			<SelectContent align="end" position="popper">
				{CURRENCIES.map((currency) => {
					const ItemFlag = currency.Flag;
					return (
						<SelectItem key={currency.code} value={currency.code}>
							<span className="flex items-center gap-2">
								<ItemFlag className="size-5" />
								<span>{currency.code}</span>
							</span>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
}
