"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CURRENCIES, getCurrencyOption, isCurrencyCode } from "@/lib/currency/currencies";
import type { CurrencyCode } from "@/lib/currency/types";
import { cn } from "@/lib/utils";

interface CurrencySelectorProps {
	className?: string;
	value: CurrencyCode;
	onValueChange: (code: CurrencyCode) => void;
}

/**
 * Pill-shaped currency picker for NGN, GHS, and USD.
 */
export function CurrencySelector({ className, value, onValueChange }: CurrencySelectorProps) {
	const selected = getCurrencyOption(value);
	const Flag = selected.Flag;

	function handleChange(next: string) {
		if (!isCurrencyCode(next)) {
			return;
		}

		onValueChange(next);
	}

	return (
		<Select onValueChange={handleChange} value={value}>
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
				<SelectValue>{value}</SelectValue>
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
