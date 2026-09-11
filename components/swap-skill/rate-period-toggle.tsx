"use client";

import { cn } from "@/lib/utils";
import { RATE_PERIOD_LABELS, RATE_PERIODS } from "@/mock-data/constants";
import type { RatePeriod } from "@/mock-data/types";

interface RatePeriodToggleProps {
	value: RatePeriod;
	onValueChange: (period: RatePeriod) => void;
	className?: string;
}

/**
 * Segmented control for hourly / daily / weekly / monthly rates.
 */
export function RatePeriodToggle({ value, onValueChange, className }: RatePeriodToggleProps) {
	return (
		<div
			className={cn(
				"inline-flex flex-wrap items-center gap-0.5 rounded-full bg-muted p-0.5",
				className
			)}
		>
			{RATE_PERIODS.map((period) => {
				const isActive = period === value;
				return (
					<button
						className={cn(
							"rounded-full px-2.5 py-1 font-medium text-[11px] transition-colors",
							isActive
								? "bg-foreground text-background"
								: "text-muted-foreground hover:text-foreground"
						)}
						key={period}
						onClick={() => onValueChange(period)}
						type="button"
					>
						{RATE_PERIOD_LABELS[period]}
					</button>
				);
			})}
		</div>
	);
}
